#!/bin/sh
SERVER="192.168.0.12"
WEBDIR="/var/www/html/"
DIR=`dirname $0`/../frontend/
{
    cd ${DIR}
    au build --env prod
    mkdir -p ${WEBDIR}/scripts
    mkdir -p ${WEBDIR}/img
    scp -r index.html ${SERVER}:${WEBDIR}
    scp -r scripts/* ${SERVER}:${WEBDIR}/scripts
    scp -r img/* ${SERVER}:${WEBDIR}/img
}
