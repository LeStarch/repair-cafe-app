from .ticket import TicketPrinter
from .settings import PrinterSettings
TICKET_SETTINGS = PrinterSettings()
TICKET_PRINTER = TicketPrinter(TICKET_SETTINGS)

if __name__ == "__main__":
    TICKET_PRINTER.connectPrinter()
    TICKET_PRINTER.printTicket("Toast Masters", "TM-1", "Gilbert's Great Ghost", "Yellow Toaster", "The yellow has drained away leaving just a toaster.")
    TICKET_PRINTER.disconnectPrinter()

