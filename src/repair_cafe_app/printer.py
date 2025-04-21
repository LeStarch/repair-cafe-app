import json
import logging
import zmq
import argparse

from .ticket import TicketPrinter
from .settings import PRINTER_PORT_MAP


logging.getLogger().setLevel(logging.INFO)
logging.info("Logging system initialized!")

LOGGER = logging.getLogger(__name__)


def parse():
    """ Parse the arguments """
    parser = argparse.ArgumentParser(description="Application handling print requets")
    parser.add_argument("--mac", required=True, help="MAC address of the printer")
    return parser.parse_args()

def message_loop(mac, socket):
    """ Message loop lifecycle """
    while True:
        LOGGER.info("Waiting for message")
        message_raw = socket.recv_string()
        try:
            message = json.loads(message_raw)
            LOGGER.info(f"Printing [{message['tNumber']}] {message['owner']} on {mac}")
            printer = TicketPrinter(mac)
            try:
                printer.connectPrinter()
                printer.printTicket(**message)
                socket.send_string(json.dumps({"success": "OK"}))
            finally:
                printer.disconnectPrinter()
        except Exception as e:
            LOGGER.error(f"{e}")
            socket.send_string(json.dumps({"error": str(e)}))

def main():
    """ Main program, Hi Lewis!!!"""
    args_ns = parse()
    mac = args_ns.mac


    context = zmq.Context()
    try:
        socket = context.socket(zmq.REP)
        ports = [printer["port"] for printer in PRINTER_PORT_MAP if printer["mac"] == mac]
        if len(ports) != 1:
            raise Exception(f"Multiple or no ports for {mac}: {ports}")
        connection_address = f"tcp://0.0.0.0:{ports[0]}"
        LOGGER.info("Binding to: %s", connection_address)
        socket.bind(connection_address)
        message_loop(mac, socket)
    finally:
        socket.close()

if __name__ == "__main__":
    main()
