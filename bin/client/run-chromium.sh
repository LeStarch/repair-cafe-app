#!/bin/sh
export DISPLAY=:0
unclutter -idle 0.1 -root &
xset s noblank
xset s off
xset -dpms
chromium-browser --kiosk --incognito http://rc-app/#/repairs/summary 
