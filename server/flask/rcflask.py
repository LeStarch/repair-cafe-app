import re
import json
import zmq
import flask
import sender

#Constants
REG_TELEPHONE = re.compile("\d{10}")

#Globals
app = flask.Flask(__name__)
pub = None

@app.route("/telephone", methods=["POST"])
def send_text():
    '''
    Sends a text with the specified message to the specified number
    @param request.form["number"]: number to text
    @param request.form["message"]: message to send
    '''
    tmp = flask.request.data.decode("utf-8") 
    data = json.loads(tmp)
    number = data["telephone"].strip().replace(" ", "").replace("-","").replace("(", "").replace(")", "")
    if not REG_TELEPHONE.match(number):
        print("[INFO] Ignoring invalid telephone: '{0}'".format(number))
        return "BAD"
    number = number.replace("-", "").replace("+", "")
    message = data["message"]
    pub.send(number, message)
    return "GOOD"

class SimPub(object):
    '''
    Handles the outgoing publish messages to the subscriber. This
    allows for multiple publishers to contact one subscriber and 
    still have serialized messages going to the SIM hardware.
    '''
    socket = None
    def __init__(self):
        '''
        Initialize publisher and prepare for sending messages.
        '''
        if self.socket is None:
            url = "tcp://127.0.0.1:{0}".format(sender.ZMQ_PORT)
            context = zmq.Context()
            self.socket = context.socket(zmq.PUB)
            #Note: subscriber binds as it is the anchor the ZMQ
            #application, and publishers will be transient
            print("[INFO] Connecting to '{0}'".format(url))
            self.socket.connect(url)
    def send(self, number, message):
        '''
        Sends out a message to specified number
        @param number: number to send to
        @param message: message to send
        '''
        outgoing = json.dumps({"number": number, "message": message})
        print("[INFO] Sending out: '{0}'".format(outgoing))
        self.socket.send_string("{0} {1}".format(sender.ZMQ_FILTER, outgoing))
 
def main():
    '''
    Main program. Hi Lewis!!!!
    '''
    global pub
    pub = SimPub()
main()
