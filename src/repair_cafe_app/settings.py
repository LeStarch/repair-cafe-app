import datetime

class PrinterSettings:
    def __init__(self):
        self.settings = {
            "location": {"name": "Pasadena", "date": str(datetime.datetime.now())},
            "printerMAC": "86:67:7A:8D:EB:63"
        }
   
    def printerMAC(self):
        return self.settings["printerMAC"]

    def locationName(self):
        return self.settings["location"]["name"]
        
    def locationDate(self):
        return self.settings["location"]["date"]
