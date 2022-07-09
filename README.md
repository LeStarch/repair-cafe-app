Repair Cafe App
===============

The Repair Cafe App was designed and built by Repair Cafe Pasadena to manage repair tickets for our
repair events. It was built around the idea of being simple, easy to use, and to be free of
internet dependencies. This means it can run on a self-hosted network entirely through battery
power!

## Design and UI

This app is setup for a distributed repair cafe model which consists of multiple rolls:

1. Check-In: checking in repairs, taking basic notes on name and item
2. Teams: each repair team (tinkerers, tailors, etc) may triage and assign repairs
3. Check-Out: checkout the repair after a sucessful (or unsuccessful) repair

Each of these roles is expressed in the app as a function in the app. In addition, the app tracks
repairer skills to aid in assignment of repairs.

The app is distributed with a central database such that users see update in almost real time!

Try it out: [Repair Cafe App Demo](https://lestarch.github.io/repair-cafe-app). **Note:** the demo
version uses local-storage, each user gets a "clean slate".  Refreshing your browser will also
clear the state.

## Hardware and Network Requirements

Although designed to be small, this app requires a local WiFi network, a server computers, and
user computersi/laptops/tablets/phones. The system is coordianted through the local WiFi.

To do this, the user should get a travel-router and configure it to setup some WiFi network
(e.g. `RepairCafeWifi`). The user can get a laptop or raspberry pi running linux to act as the
webserver and database.  Users can use whatever browser they'd like to. All of these can use
the WiFi to talk in a closed-network.

In Repair Cafe Pasadena, we run the travel router and raspberry pi webserver via a battery-pack
such that the system requires no power, and no internet.  Our users use phones, tablets, and laptops
so there is no external power requirements there either.  **Note:** we always need to remember to
charge these things beforehand.

**Optional Hardware:** if you want some resilency in the database, you can setup a cluster of
computers to run ElasticSearch. Pasadena uses 2x RPIs to do this. It is (probably) not necessary
as hardware failures likelyhood is low during the event, but we wanted to see if we could.

## Software Requirements

The repair-cafe app requires three software requiremnets:

1. `nginx`, a lightweight webserver to host the page
2. `elasticsearch`, the database storing the ticketing information
3. A web browser for accessing the page

`nginx` and `elasticsearch` must be setup on a host or server machine to provide the app. This
system should function on a system as small as an arm64 computer running with 4GB of RAM
(Raspberry PI 4 or equivalent). A linux laptop or linux VM running on a laptop would also surfice.

The web browsers run on the users laptops, computers, tablets, or even phones. Each connect to the
served app just like any other webpage.

**Optional Software**: a router with configurable DNS or hostnames can make the app run with a nice
URL. At pasadena, we run a local DNS lookup such that users navigate to 
http://app.repair-cafe-pasadena.org/. **Note:** this endpoint is only available when attaching to
our network.

## (In Progress) Parts List to Build the Repair Cafe Pasadena "In a Box" Setup

1. Travel Router: (TODO: link)
2. Computers: Raspberry PI 4. See "Odroid M1" for alternabtive as RPI4s are hard to get
3. Battery Pack: 50000mAH, 2 x 5V 3A output

The travel router uses the RPI 4's USB power. We have 2x RPI 4's plugged in to the battery pack's
USB output. Each has a USB cable with power switch so they can be turned on independenly.

