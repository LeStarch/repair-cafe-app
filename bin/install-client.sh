#!/bin/bash
DIR=$(dirname $BASH_SOURCE)
if [[ "$1" == "" ]]
then
    echo "[ERROR] Client must be supplied"
    exit
fi
CLIENT="${1}"
#SCP install files
scp $DIR/client/* ${CLIENT}:
ssh ${CLIENT} "sudo bash install-remote.sh"
