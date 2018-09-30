#!/bin/sh
SERVER="192.168.0.12"
WEBDIR="/var/www/html/"
DIR=`dirname $0`/../frontend/
{
    cd ${DIR}
    au build --env prod
    ssh ${SERVER} "mkdir -p ${WEBDIR}/scripts"
    ssh ${SERVER} "mkdir -p ${WEBDIR}/img"
    ssh ${SERVER} "mkdir -p ${WEBDIR}/bootstrap/fonts"
    scp -r index.html ${SERVER}:${WEBDIR}
    scp -r scripts/* ${SERVER}:${WEBDIR}/scripts
    scp -r img/* ${SERVER}:${WEBDIR}/img
    scp -r bootstrap/fonts/* ${SERVER}:${WEBDIR}/bootstrap/fonts
}
