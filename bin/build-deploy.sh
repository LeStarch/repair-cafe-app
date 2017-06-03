#!/bin/sh
WEBDIR="/var/www/html/"
DIR=`dirname $0`
sh ${DIR}/../bin/init.sh
au build --env prod
cp -r ${DIR}/../index.html ${DIR}/../scripts/ ${DIR}/../img/ ${WEBDIR} 
