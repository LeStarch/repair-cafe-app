## Installation: From Scratch

> [!WARNING]
> This section requires more advanced skills. A simpler setup can be done via our [SD card image](#installation-from-image).

Prerequsites:
1. Raspberry PI 5, SD card
2. Basic Configured Mobile WiFi Router

This section will help you set up an Raspberry PI 5 and SD card from scratch. 

### Setting Up RaspberryPI OS

Download and install [RaspberryPI Imager](https://www.raspberrypi.com/software/).  Insert SD card and and run imager. Select the following:

1. Raspberry PI 5
2. Raspbery PI OS (Other) / Rasspberry PI OS Lite (64-bit)
3. Your SD card

Click "Next" and select "Edit Settings".  Under "General", set the following:
1. Hostname: `repair-cafe-app`
2. Username / Password: `rcadmin` / `wefixstuff`
3. No Wireless
4. Set Local: Per Your RepairCafe

Click next, and "Yes" when asked if erasing the SD card is ok.  Wait until finished, eject the card, and install it into the Raspberry PI 5.

> [!TIP]
> Change passwords above for added security.

### Setting Up Repair Cafe App

Plug the Raspberry PI into the ethernet on the moble router, power on the Raspberry PI, moble router, and join the `repair-cafe-internal` network.

#### Assigning the RPI Hostname and Static IP

Sign into the admin page of the mobile WiFi router.  Select "Network" / "DNS and DHCP".  Then choose the "Static Leases" tab.

Add your PI as a static lease for an IP address on your network.  Typically `192.168.8.2`.

Next choose "Hostnames" tab, and add an entry for `repair-cafe-app` using that previously selected IP address.

Power-cycle your Reaspberry PI and then SSH using `rcadmin`/your password to `repair-cafe-app`.

```
ssh rcadmin@repair-cafe-app
```

#### Installing the Application

While on the the PI install git and clone the application:

```
sudo apt update
sudo apt install git
sudo chown rcadmin /var/www/html/
git clone https://github.com/lestarch/repair-cafe-app /var/www/html/repair-cafe-app
```

Change directory into `repair-cafe-app/bin` and run install:

```
cd repair-cafe-app/bin
./install.sh
```

Wait for install to complete.





