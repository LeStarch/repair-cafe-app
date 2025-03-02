import datetime

PORT_MAP = {
    "86:67:7a:8a:b7:ac": 3003,
    "86:67:7a:03:98:e0": 3002,
    "86:67:7a:8d:eb:63": 3001
}


class PrinterSettings:
    def __init__(self):
        self.settings = {
            "location": {"name": "St. Edmonds", "date": datetime.datetime.now().strftime("%Y-%m-%d")},
            "printerMAC": "86:67:7A:03:98:E0" #"86:67:7A:8A:B7:AC" #"86:67:7A:8D:EB:63"
        }
   
    def printerMAC(self):
        return self.settings["printerMAC"]

    def locationName(self):
        return self.settings["location"]["name"]
        
    def locationDate(self):
        return self.settings["location"]["date"]
