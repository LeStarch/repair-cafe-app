import datetime

class PrinterSettings:
    def __init__(self):
        self.settings = {
            "location": {"name": "Pasadena Senior Center", "date": datetime.datetime.now().strftime("%Y-%m-%d")},
            "printerMAC": "86:67:7A:03:98:E0" #"86:67:7A:8A:B7:AC" #"86:67:7A:8D:EB:63"
        }
   
    def printerMAC(self):
        return self.settings["printerMAC"]

    def locationName(self):
        return self.settings["location"]["name"]
        
    def locationDate(self):
        return self.settings["location"]["date"]
