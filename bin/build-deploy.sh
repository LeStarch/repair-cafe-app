#!/bin/sh
DIR=`dirname $0`
au build --env prod
scp ${DIR}/../scripts/* 192.168.0.2:/var/www/html/scripts/
scp -r ${DIR}/../img/ 192.168.0.2:/var/www/html/
