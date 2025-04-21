""" Main Flask Application file

This is the main file for the Flask application.
"""
import getpass
import json
import logging
import subprocess
import time
import zmq
from pathlib import Path
from flask import Flask, request

from .event_info import EventConfiguration
from .ticket import TicketPrinter
from .settings import PRINTER_PORT_MAP

logging.getLogger().setLevel(logging.INFO)
logging.info("Logging system initialized!")

LOGGER = logging.getLogger(__name__)

# Local to process store for event data
EVENT_DATA = {}

# Set the static folder path to the same location as nginx
STATIC_FILES_FOLDER = Path(__file__).parent.parent.parent
app = Flask(__name__, static_url_path="", static_folder=STATIC_FILES_FOLDER)

# Setup a zmq socket to run the printer
context = zmq.Context()

@app.before_request
def load_event_data():
    """ Safely loads event data into EVENT_DATA """
    global EVENT_DATA
    event_configuration_loader = EventConfiguration()
    try:
        read_event_data = event_configuration_loader.read()
    # Ignore missing files
    except FileNotFoundError:
        read_event_data = {}
    EVENT_DATA["host"] = read_event_data.get("host", "Pasadena")
    EVENT_DATA["location"] = read_event_data.get("location", "Unknown Location")
    EVENT_DATA["printers"]  = read_event_data.get("printers", PRINTER_PORT_MAP)

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

@app.route("/app/set-time", methods=["POST"])
def set_time():
    """ Set the system time on the server
    
    This route is used to set the system time on the server. It is used to
    synchronize the time on the server with the time on a client that has
    access to time (e.g. via the cellular network).

    Request format:
    {
        "time": <integer number of seconds since epoch>
    }

    Response format: see get_time()
    """
    json_data = request.get_json()
    if json_data is None:
        return {"error": "No data received"}, 400
    time_request = json_data.get("time", None)
    if time_request is None:
        return {"error": "'time' field not provided"}, 400
    if not isinstance(time_request, int):
        return {"error": "'time' field must be an integer"}, 400
    LOGGER.info("[INFO] Setting system time to: %sS since epoch", time_request)
    # Set the system time and hardware clock from the provided seconds since epoch
    # This requires root privileges, so we use sudo to run the command
    try:
        subprocess.run(["/usr/bin/sudo", "/usr/bin/date", "-s", f"@{time_request}"], check=True)
    except subprocess.CalledProcessError as e:
        LOGGER.error("Failed to set system time: %s", e)
        return {"error": f"Failed to set system time: {e}"}, 500
    epoch_time = time.time()
    if epoch_time < (time_request - 60) or epoch_time > (time_request + 60):
        LOGGER.error("Failed to validate system time: {epoch_time} not with 60 S of {time_request}", e)
        return {"error": f"Time validation failed"}, 500
    return get_time()

@app.route("/app/get-time", methods=["GET"])
def get_time():
    """ Get the system time on the server
    
    Response format:
    {
        "current_time": <float number of seconds since epoch>
    }
    """
    return {"current_time": time.time()}, 200

@app.route("/app/get-location-info", methods=["GET"])
def get_location_info():
    """ Get the location information for the event

    Response format:
    {
        "location": <string location>,
        "host": <string host>
    }
    """
    return {
        "location": EVENT_DATA["location"],
        "host": EVENT_DATA["host"],
        "printers": EVENT_DATA["printers"]
    }

@app.route("/app/set-location-info", methods=["POST"])
def set_location_info():
    """ Set the location information for the event
    
    This will set the location information for all processes running on the local host.

    Request format:
    {
        "location": <string location>,
        "host": <string host>
    }

    Response format: see get_location_info()
    """
    json_data = request.get_json()
    if json_data is None:
        return {"error": "No data received"}, 400
    event_info = {
        "location": json_data.get("location", None),
        "host": json_data.get("host", None),
        # Printer port map is optional
        "printers": json_data.get("printers", PRINTER_PORT_MAP)
    }
    for key, value in event_info.items():
        if value is None:
            return {"error": f"'{key}' is a required field"}, 400
    # Write, then re-load event data
    event_configuration = EventConfiguration()
    LOGGER.info("Event Info 0: %s", event_info)
    event_configuration.write(event_info)
    load_event_data()
    return get_location_info()

@app.route("/app/print-ticket", methods=["POST"])
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
    mac = json_data.get("printer", "Unknown")
    LOGGER.info("Connecting to printer: %s as '%s'", mac, getpass.getuser())
    ports = [printer["port"] for printer in EVENT_DATA["printers"] if printer["mac"] == mac]
    if len(ports) != 1:
        return {"error": f"Multiple or no ports for {mac}: {ports}"}
    port = ports[0]
    socket = context.socket(zmq.REQ)
    try:
        connection_address = f"tcp://127.0.0.1:{port}"
        socket.connect(connection_address)
        LOGGER.info("Sending print request: %s", connection_address)
        socket.send_string(json.dumps({"location": EVENT_DATA["location"], "host": EVENT_DATA["host"], "queue": team, "owner": name, "tNumber": number, "item": item, "problem": problem}))
        return socket.recv_string()
    finally:
        socket.close()
