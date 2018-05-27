import os
import serial
import flask
import json

DEV_DIR="/dev"
DEV_PATTERN="ttyACM"
DEV_BAUD=19200

ar_serial = None
app = flask.Flask(__name__)

@app.route("/telephone", methods=["POST"])
def send_text():
    '''
    Sends a text with the specified message to the specified number
    @param request.form["number"]: number to text
    @param request.form["message"]: message to send
    '''
    tmp = flask.request.data.decode("utf-8") 
    print("DATA:",tmp)
    data = json.loads(tmp)
    number = data["telephone"]
    message = data["message"]
    number = number.replace("-", "").replace("+", "")
    ar_serial.write(bytes("AT+CMGS=\"{0}\"\r\n".format(number),"ascii"))
    ar_serial.write(bytes("{0}".format(message),"ascii"));
    ar_serial.write(bytes(chr(0x1A), 'ascii'))
    print("[INFO] Received message: '{0}'".format(
          "\n".join([ it.decode("ascii") for it in ar_serial.readlines()])))
    return "GOOD"
def setup(serial):
    '''
    Sets up the SIM device on the serial port
    @param serial: port to communicate with
    '''
    print("[INFO] Setting up AT SIM device")
    serial.write(b"AT+IPR=19200\r\n")
    serial.write(b"AT+CMGF=1\r\n")
    print("[INFO] Received message: '{0}'".format(
          "\n".join([ it.decode("ascii") for it in serial.readlines()])))
def main():
    '''
    Main program. Hi Lewis!!!!
    '''
    global ar_serial
    print("[INFO] Detecting ports")
    port = None
    for item in os.listdir(DEV_DIR):
        #Items following ttyACM* are what we are looking for
        if item.startswith(DEV_PATTERN):
            port = os.path.join(DEV_DIR, item)
    #Fail if port is None
    if port is None:
        raise Exception(
            "No device matching: {0}/{1}*".format(DEV_DIR, DEV_PATTERN))
    #Open the port using pyserial
    ar_serial = serial.Serial(port,  DEV_BAUD, timeout=0.5)
    setup(ar_serial)
main()
