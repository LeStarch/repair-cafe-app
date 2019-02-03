#!/bin/bash
#apt-get update
apt-get install -y chromium-bsu
timedatectl set-ntp on
mkdir -p bin
mv run-chromium.sh bin/
mv rcapp.service /etc/systemd/system
mv timesyncd.conf /etc/systemd/timesyncd.conf
systemctl daemon-reload
systemctl restart systemd-timesyncd
systemctl restart rcapp

