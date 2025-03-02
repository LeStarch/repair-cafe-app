""" ticket.py: sets up code for printing tickets

Borrowed and updated from demo code (https://github.com/mescoops/RCTicketPrinter/blob/main/Ticket.py), this file
contains the utility functions for printing tickets on the recipt printer.
"""
import os
import sys
from datetime import datetime
import time

from escpos import feature
from escpos.impl.epson import GenericESCPOS
from escpos import BluetoothConnection
from PIL import Image, ImageOps
import six


class TicketPrinter(object):
   
    def __init__(self, settings):
        self.btConn = None
        self.printer = None
        self.connOK = False
        self.settings = settings
        self.logoInit()


    def printTicket(self, queue, tNumber, owner, item, problem):
        self.connectPrinter()
        self.printer.init()
        self.printer.text('-' * self.printer.feature.columns.normal)
        self.printer.text('-' * self.printer.feature.columns.normal)
        self.logo()
        self.queue(queue)
        self.number(tNumber)
        self.owner(owner)
        self.item(item, problem)
        self.logoName()
        self.location(self.settings.locationName(), self.settings.locationDate())
        self.finalStatus()
        self.stub(queue, tNumber, owner, item)
        self.endDoc()
        self.disconnectPrinter()
        

    def connectPrinter(self):
        print("Conn OK "+str(self.connOK))
        if self.connOK:
            return
        # uses SPD (service port discovery) services to find which port to connect to
        self.btConn = BluetoothConnection(self.settings.printerMAC())
        self.printer = GenericESCPOS(self.btConn)
        self.connOK = True
        self.printer.init()
        self.printer.hardware_features.update({
           feature.COLUMNS: feature.Columns(
               normal=32,
               expanded=16,
               condensed=48
              ),
           })
           
           
    def disconnectPrinter(self):
        self.btConn.socket.close()
        self.connOK = False
                  
           
    def logoName(self):
        self.printer.init()
        self.printer.justify_center()
        self.printer.set_expanded(True)
        self.printer.text('Repair Cafe') #é
        self.printer.text('San Fernando')
        self.printer.set_expanded(False)
        self.printer.lf()
        time.sleep(0.1)

    def finalStatus(self):
        self.printer.init()
        self.printer.justify_left()
        self.printer.set_expanded(True)
        self.printer.text("Status:")
        self.printer.lf()
        time.sleep(0.1)
        self.printer.text('__ Repaired')
        self.printer.lf()
        time.sleep(0.1)

        self.printer.text('__ No time')
        self.printer.lf()
        time.sleep(0.1)

        self.printer.text('__ Unrepairable')
        self.printer.lf()
        time.sleep(0.1)

        self.printer.text('__ Consult')
        self.printer.lf()
        time.sleep(0.1)

        self.printer.text('__ Need part')
        self.printer.lf()
        self.printer.text('_____________')
        self.printer.lf()
        time.sleep(0.1)

        self.printer.set_expanded(False)
        self.printer.lf()
        time.sleep(0.1)

    def number(self, tNum: int):
        self.printer.init()
        self.printer.justify_center()
        self.printer.set_expanded(True)
        self.printer.text('Ticket #{}'.format(tNum.split("-")[-1]))
        self.printer.set_expanded(False)
        self.printer.lf()
        self.printer.text(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        self.printer.lf()
        time.sleep(0.1)


    def queue(self, rqueue: str):
        self.printer.init()
        self.printer.justify_center()
        self.printer.set_text_size(3, 7)
        #self.printer.lf()
        self.printer.text(rqueue)
        self.printer.lf()
        time.sleep(0.1)
        

    def owner(self, name: str):
        self.printer.init()
        self.printer.set_emphasized(True)
        self.printer.textout('Owner: ')
        self.printer.set_emphasized(False)
        self.printer.text(name)
        self.printer.lf()
        time.sleep(0.1)
        
        
    def item(self, thing: str, problem: str=None):
        self.printer.init()
        self.printer.set_emphasized(True)
        self.printer.textout('Item: ')
        self.printer.set_emphasized(False)
        self.printer.text(thing)
        if problem is not None:
            self.printer.set_emphasized(True)
            self.printer.text('Problem:')
            self.printer.set_emphasized(False)
            self.printer.text(problem)
        self.printer.lf()
        time.sleep(0.1)
        

    def disclamer(self):
        self.printer.init()
        self.printer.text('By Signing I acknowledge...')
        self.printer.set_condensed(True)    
        self.printer.text('1) I have had an oppporunity to communicate the nature of the problem')
        self.printer.text('2) An effort has been made to evaluate and/or\nrepair my item')
        self.printer.set_condensed(False)
        time.sleep(0.1)
        self.printer.lf()
        self.printer.lf()
        self.printer.lf()
        self.printer.text('-' * self.printer.feature.columns.normal)
        self.printer.lf()


    def stub(self, queue, tNumber, owner, item):
        self.printer.init()
        self.printer.lf()
        self.printer.lf()
        self.printer.text('-' * self.printer.feature.columns.normal)
        self.printer.justify_center()
        self.printer.text("Patron Copy")
        self.printer.lf()
        self.queue(queue)
        self.number(tNumber)
        self.owner(owner)
        self.item(item)

        
    def location(self, loc: str, day: str):
        self.printer.init()
        self.printer.justify_center()
        self.printer.set_emphasized(True)
        self.printer.text(loc)
        self.printer.text(day)
        time.sleep(0.1)
        
    def endDoc(self):
        self.printer.lf()
 


    def logoInit(self):   
        filename = os.path.dirname(__file__) + u"/RepairCafe_White.png"
        # Load Image
        im = Image.open(filename)

        self.high_density_horizontal = True
        self.high_density_vertical = True
        
        # Initial rotate. mirror, and extract blobs for each 8 or 24-pixel row
        # Convert to black & white via greyscale (so that bits can be inverted)
        im = im.convert("L")  # Invert: Only works on 'L' images
        im = ImageOps.invert(im) # Bits are sent with 0 = white, 1 = black in ESC/POS
        im = im.convert("1") # Pure black and white
        im = im.transpose(Image.ROTATE_270).transpose(Image.FLIP_LEFT_RIGHT)
        self.imSize = im.size
        line_height = 3 if self.high_density_vertical else 1
        self.blobs = _to_column_format (im, line_height * 8);


    def logo(self):
        
        # Generate ESC/POS header and print image
        ESC = b"\x1b";
        # Height and width refer to output size here, image is rotated in memory so coordinates are swapped
        height_pixels, width_pixels = self.imSize
        density_byte = (1 if self.high_density_horizontal else 0) + (32 if self.high_density_vertical else 0);
        header = ESC + b"*" + six.int2byte(density_byte) + _int_low_high( width_pixels, 2 );
        
        self.printer.device.write(ESC + b"3" + six.int2byte(16)); # Adjust line-feed size
        for blob in self.blobs:
            self.printer.device.write(header + blob + b"\n")
            time.sleep(0.01)
        self.printer.device.write(ESC + b"2"); # Reset line-feed size
        self.printer.lf()




def _to_column_format(im, line_height):
    """
    Extract slices of an image as equal-sized blobs of column-format data.

    :param im: Image to extract from
    :param line_height: Printed line height in dots
    """
    width_pixels, height_pixels = im.size
    top = 0
    left = 0
    blobs = []
    while left < width_pixels:
        remaining_pixels = width_pixels - left
        box = (left, top, left + line_height, top + height_pixels)
        slice = im.transform((line_height, height_pixels), Image.EXTENT, box)
        bytes = slice.tobytes()
        blobs.append(bytes)
        left += line_height
    return blobs

def _int_low_high(inp_number, out_bytes):
    """ Generate multiple bytes for a number: In lower and higher parts, or more parts as needed.
    
    :param inp_number: Input number
    :param out_bytes: The number of bytes to output (1 - 4).
    """
    max_input = (256 << (out_bytes * 8) - 1);
    if not 1 <= out_bytes <= 4:
        raise ValueError("Can only output 1-4 byes")
    if not 0 <= inp_number <= max_input:
        raise ValueError("Number too large. Can only output up to {0} in {1} byes".format(max_input, out_bytes))
    outp = b'';
    for _ in range(0, out_bytes):
        outp += six.int2byte(inp_number % 256)
        inp_number = inp_number // 256
    return outp

