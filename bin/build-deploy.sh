#!/bin/sh
SERVER="192.168.0.2"
WEBDIR="/var/www/html/"
DIR=`dirname $0`
sh ${DIR}/../bin/init.sh
au build --env prod
scp -r ${DIR}/../index.html ${SERVER}:${WEBDIR}
scp -r ${DIR}/../scripts/* ${SERVER}:${WEBDIR}/scripts
scp -r ${DIR}/../img/* ${SERVER}:${WEBDIR}/img
