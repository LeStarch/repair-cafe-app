####
# settings.py
# This file contains the settings for the Repair Cafe App's flask server.
#
# Users may change these settings to configure the app's behavior.
#####
import os
PRINTER_PORT_MAP = [
    {"name": "P1", "mac": "86:67:7a:8d:eb:63", "port": 3001},
    {"name": "P2", "mac": "86:67:7a:03:98:e0", "port": 3002},
    {"name": "P3", "mac": "86:67:7a:8a:b7:ac", "port": 3003},
]
RUNTIME_PATH = os.environ.get("APP_RUN_PATH", "/tmp/repair_cafe_app")
