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

def message_loop(settings, socket):
    """ Message loop lifecycle """
    while True:
        message_raw = socket.recv()
        try:
            message = json.loads(message_raw)
            print(f"[INFO] Printing [{message['tNumber']}] {message['owner']} on {settings.printerMAC()}")
            settings.settings["location"]["name"] = message["location"]
            del message["location"]
            printer = TicketPrinter(settings)
            try:
                printer.connectPrinter()
                printer.printTicket(**message)
                socket.send_string(json.dumps({"success": "OK"}))
            finally:
                printer.disconnectPrinter()
        except Exception as e:
            print(f"[ERROR] {e}")
            socket.send_string(json.dumps({"error": str(e)}))

def main():
    """ Main program, Hi Lewis!!!"""
    args_ns = parse()
    settings = PrinterSettings()
    settings.settings["printerMAC"] = args_ns.mac

    context = zmq.Context()
    socket = context.socket(zmq.REP)
    socket.bind(f"ipc:///tmp/printer_{args_ns.mac.replace(':', '_')}")
    message_loop(settings, socket)


if __name__ == "__main__":
    main()
