import os
import re
import json
import zmq
import serial

#ZMQ constants
ZMQ_PORT=5502
ZMQ_FILTER="telephone"

#Serial constants
DEV_DIR="/dev"
DEV_PATTERN="ttyACM"
DEV_BAUD=19200
REPLY_WAIT_COUNT=10

class SimSub(object):
    '''
    A handler for the ZeroMQ subscriber that subscribes to the
    message queues and ensures that a single stream of data in
    order is sent to the serial interface preventing re-entrancy
    problems when multiple clients are running in parallel.
    '''
    device = None
    socket = None
    def __init__(self, wait=REPLY_WAIT_COUNT):
        '''
        Constructor
        '''
        self.wait = REPLY_WAIT_COUNT
        self.cont = True
        self.setup()

    def setup(self):
        '''
        Function used to setup/re-setup both the SIM 900 card
        device and the the ZeroMQ socket.
        '''
        if self.socket is None:
            url = "tcp://*:{0}".format(ZMQ_PORT)
            context = zmq.Context()
            self.socket = context.socket(zmq.SUB)
            #Note: subscriber binds as it is the anchor the ZMQ
            #application, and publishers will be transient
            print("[INFO] Binding to '{0}'".format(url))
            self.socket.bind(url)
            self.socket.setsockopt_string(zmq.SUBSCRIBE, ZMQ_FILTER)
        #For the serial port, it is important to entirely reset
        #the device when an error occurs
        if not self.device is None:
            try:
                self.device.close()
            except Exception as exc:
                print("[WARNING] Exception occured while closeing port {0}".format(exc))
        #Now setup device from scratch
        port = self.detect()
        print("[INFO] Setting up AT SIM device: {0}".format(port))
        self.device = serial.Serial(port, DEV_BAUD, timeout=0.5)
        self.send_recv("", "Starting Up")
        #Escape to clear garbage
        self.send_recv(chr(0x1b))
        self.send_recv("ATE0\r", expected="OK")
        self.send_recv("ATI\r", expected="OK")
        self.send_recv("AT+IPR=19200\r", expected="OK")
        self.send_recv("AT+CMGF=1\r", expected="OK")
        self.send_recv('AT+CSCS="GSM"\r', "OK")

    def detect(self):
        '''
        Detects the serial AT device to use
        '''
        port = None
        for item in os.listdir(DEV_DIR):
            #Items following ttyACM* are what we are looking for
            if item.startswith(DEV_PATTERN):
                port = os.path.join(DEV_DIR, item)
        #Fail if port is None
        if port is None:
            raise Exception("No device matching: {0}/{1}*".format(DEV_DIR, DEV_PATTERN))
        return port

    def loop(self):
        '''
        Main program loop for this subscriber
        '''
        while self.cont:
            try:
                print("[INFO] Waiting for message...")
                message = self.socket.recv_string()
                print("[INFO] Received: '{0}'".format(message))
                message = message[len(ZMQ_FILTER) + 1:]
                print(message)
                message = json.loads(message)
                self.send_msg(message["number"], message["message"])
            except Exception as exc:
                #print("[WARNING] Exception occured, resetting {0}".format(exc))
                #self.setup() 
                raise
         
    def send_msg(self, number, message):
        '''
        Sends/Receives the message. First clears anything pending.
        @param number: number to send to
        @param message: message to send in std python string format
        '''
        #Encoding as ascii (UTF-8) for transmission
        self.send_recv(chr(0x1b))
        outgoing = "AT+CMGS=\"{0}\"\r".format(number)
        self.send_recv(outgoing, "> ")
        outgoing = message + chr(0x1A)
        self.send_recv(outgoing, "OK")

    def send_recv(self, outgoing, expected=None):
        '''
        Send/Recv the bytes to the message. Will search output
        for expected message up to N times.
        @param outgoing: outgoing bytes
        @param expected: (optional) expected output
        '''
        outgoing = bytes(outgoing, "ascii")
        print("[INFO] Sending: {0}".format(outgoing))
        self.device.write(outgoing)
        for i in range(0, self.wait):
            incoming = self.device.read(1024)
            print("[INFO] Recving: {0}".format(incoming))
            incoming = incoming.decode("ascii")
            for resp in incoming.split("\r\n"):
                if expected is None or resp == expected:
                    break
            else:
                continue
            break
        else:
            raise Exception("[ERROR] Failed to receive expected: '{0}'".format(expected))
        return incoming.split("\r\n")

def main():
    '''
    Main program. Hi Lewis!!!
    '''
    looper = SimSub()
    looper.loop()

if __name__ == "__main__":
    main()
