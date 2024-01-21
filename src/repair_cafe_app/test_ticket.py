import json
import zmq
import argparse

from .ticket import TicketPrinter
from .settings import PrinterSettings


def parse():
    """ Parse the arguments """
    parser = argparse.ArgumentParser(description="Application handling print requets")
    parser.add_argument("--mac", nargs="+", help="MAC address of the printer")
    parser.add_argument("--problem", required=True, default="It does not emit yellow.", help="MAC address of the printer")
    return parser.parse_args()

def main():
    """ Main program, Hi Lewis!!!"""
    args_ns = parse()
    settings = PrinterSettings()
    settings.settings["printerMAC"] = args_ns.mac

    context = zmq.Context()
    socket = context.socket(zmq.REQ)
    for mac in args_ns.mac:
        print(f"[INFO] Connecting to farm at {mac}")
        socket.connect(f"ipc:///tmp/printer_{mac.replace(':', '_')}")
    socket.send_string(json.dumps({"location": "Garfield", "queue": "Tinker", "owner": "Johan", "tNumber": "Tinker-1", "item": "Yellow Toaster", "problem": args_ns.problem}))
    print(socket.recv())

if __name__ == "__main__":
    main()
