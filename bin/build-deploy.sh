#!/bin/sh
WEBDIR="/var/www/html/"
DIR=`dirname $0`
au build --env prod
cp -r ${DIR}/../index.html ${DIR}/../scripts/ ${DIR}/../img/ ${WEBDIR} 
