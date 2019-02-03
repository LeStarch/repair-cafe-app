#!/bin/sh
export DISPLAY=:0
unclutter -idle 0.1 -root &
xset s noblank
xset s off
xset -dpms
chromium-browser --kiosk --ignore-certificate-errors --incognito https://rcuser:<PASSWD>@192.168.0.12/#/repairs/summary 
