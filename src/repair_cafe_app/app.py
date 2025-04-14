""" Main Flask Application file

This is the main file for the Flask application.
"""
import getpass
import json
import logging
import subprocess
import zmq
from pathlib import Path
from flask import Flask, request

from .ticket import TicketPrinter
from .settings import PrinterSettings, PORT_MAP

logging.getLogger().setLevel(logging.INFO)
logging.info("Logging system initialized!")

LOGGER = logging.getLogger(__name__)

MACS=["86:67:7a:8a:b7:ac", "86:67:7a:03:98:e0", "86:67:7a:8d:eb:63"]
LOC="Pasadena Armory"

# Set the static folder path to the same location as nginx
STATIC_FILES_FOLDER = Path(__file__).parent.parent.parent
app = Flask(__name__, static_url_path="", static_folder=STATIC_FILES_FOLDER)

# Setup a zmq socket to run the printer
context = zmq.Context()

@app.route("/")
def index():
    """ HTML route handling index.html -> / translation """
    return app.send_static_file("index.html")


@app.route("/src/config.js")
def config():
    """ Pass back config.js corrected for local storage
    
    When serving all files through Flask, storage through ES is not available as that
    must be served through nginx. This route will serve the config.js file with
    the USE_LOCAL_STORAGE variable set to true. This allows the app to run in a
    development environment without nginx.
    """
    with open(Path(__file__).parent.parent / "config.js", "r") as file_handle:
        text = file_handle.read().replace("static USE_LOCAL_STORAGE = false;", "static USE_LOCAL_STORAGE = true;")
    return app.response_class(
        response=text,
        status=200,
        mimetype="text/javascript"
    )

@app.route("/set-time", methods=["POST"])
def set_time():
    """ Set the system time on the server
    
    This route is used to set the system time on the server. It is used to
    synchronize the time on the server with the time on a client that has
    access to time (e.g. via the cellular network).
    """
    json_data = request.get_json()
    if json_data is None:
        return {"error": "No data received"}, 400
    time = json_data.get("time", None)
    if time is None:
        return {"error": "'time' field not provided"}, 400
    if not isinstance(time, int):
        return {"error": "'time' field must be an integer"}, 400
    LOGGER.info("Setting system time to: %sS since epoch", time)
    # Set the system time and hardware clock from the provided seconds since epoch
    # This requires root privileges, so we use sudo to run the command
    try:
        subprocess.run(["sudo", "date", "-s", f"@{time}"], check=True)
    except subprocess.CalledProcessError as e:
        LOGGER.error("Failed to set system time: %s", e)
        return {"error": f"Failed to set system time: {e}"}, 500
    try:
        subprocess.run(["sudo", "hwclock", "-w"], check=True)
    except subprocess.CalledProcessError as e:
        LOGGER.error("Failed to set hardware time: %s", e)
    return {"message": "System time set to {}".format(time)}, 200


@app.route("/print-ticket", methods=["POST"])
def print_ticket():
    """ HTML route used to print the ticket information """
    json_data = request.get_json()
    if json_data is None:
        return {"error": "No data received"}, 400
    team = json_data.get("team", "Scoops")
    name = json_data.get("name", "Anonymous")
    number = json_data.get("id", "Unknown")
    item = json_data.get("item", "Unknown")
    problem = json_data.get("problem", "It is broken.")
    mac = json_data.get("printer", MACS[0])
    LOGGER.info("Connecting to printer: %s as '%s'", mac, getpass.getuser())
    socket = context.socket(zmq.REQ)
    try:
        connection_address = f"tcp://127.0.0.1:{PORT_MAP[mac]}"
        socket.connect(connection_address)
        LOGGER.info("Sending print request: %s", connection_address)
        socket.send_string(json.dumps({"location": LOC, "queue": team, "owner": name, "tNumber": number, "item": item, "problem": problem}))
        return socket.recv_string()
    finally:
        socket.close()
