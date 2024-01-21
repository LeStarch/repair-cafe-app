""" Main Flask Application file

This is the main file for the Flask application.
"""
import json
import zmq
from pathlib import Path
from flask import Flask, request

from .ticket import TicketPrinter
from .settings import PrinterSettings

MACS=["86:67:7a:8a:b7:ac", "86:67:7a:03:98:e0", "86:67:7a:8d:eb:63"]
LOC="Pasadena Senior Center"

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
    """ Special handling of config to ensure local storage """
    with open(Path(__file__).parent.parent / "config.js", "r") as file_handle:
        text = file_handle.read().replace("static USE_LOCAL_STORAGE = false;", "static USE_LOCAL_STORAGE = true;")
    return app.response_class(
        response=text,
        status=200,
        mimetype="text/javascript"
    )

@app.route("/print-ticket", methods=["POST"])
def print_ticket():
    """ HTML route used to print the ticket information """
    json_data = request.get_json()
    team = json_data.get("team", "Scoops")
    name = json_data.get("name", "Anonymous")
    number = json_data.get("id", "Unknown")
    item = json_data.get("item", "Unknown")
    problem = json_data.get("problem", "It is broken.")
    print(f"[INFO] Printing: [{number}] {name}")
    socket = context.socket(zmq.REQ)
    for MAC in MACS:
        socket.connect(f"ipc:///tmp/printer_{MAC.replace(':', '_')}")
    socket.send_string(json.dumps({"location": LOC, "queue": team, "owner": name, "tNumber": number, "item": item, "problem": problem}))
    return socket.recv()
