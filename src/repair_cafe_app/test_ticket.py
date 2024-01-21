import json
import zmq
import argparse

from .ticket import TicketPrinter
from .settings import PrinterSettings


def parse():
    """ Parse the arguments """
    parser = argparse.ArgumentParser(description="Application handling print requets")
    parser.add_argument("--mac", required=True, help="MAC address of the printer")
    return parser.parse_args()

def main():
    """ Main program, Hi Lewis!!!"""
    args_ns = parse()
    settings = PrinterSettings()
    settings.settings["printerMAC"] = args_ns.mac

    context = zmq.Context()
    socket = context.socket(zmq.REQ)
    socket.connect(f"ipc:///tmp/printer_{args_ns.mac.replace(':', '_')}")
    socket.send_string(json.dumps({"location": "Garfield", "queue": "Tinker", "owner": "Johan", "tNumber": "Tinker-1", "item": "Yellow Toaster", "problem": "It does not emit heat when it is sad"}))
    print(socket.recv())

if __name__ == "__main__":
    main()
