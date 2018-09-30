#!/bin/bash
ES_VERSION="6.4.1"
SCRIPT_DIR=$(cd $(dirname $BASH_SOURCE)/..; pwd)
if [ "$EUID" -ne 0 ]
then
    echo "[ERROR] Must run install script as sudo"
    exit
fi
#Adds in NTP time and date synching
timedatectl set-ntp true
cp ${SCRIPT_DIR}/server/ntp.conf /etc/ntp.conf
apt install -y nodejs npm nginx wget openjdk-11-jre-headless apache2-utils curl
if (( $? != 0 ))
then
    echo "[ERROR] Failed to apt install"
    exit 1
fi
#npm install -g aurelia-cli bootstrap@3 jquery@2
if (( $? != 0 ))
then
    echo "[ERROR] Failed to npm install"
    exit 1
fi
####
# Download, install, enable and run elasticsearch
####
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-${ES_VERSION}.deb -P /tmp
apt install /tmp/elasticsearch-${ES_VERSION}.deb
if (( $? != 0 ))
then
    echo "[ERROR] Failed to install ElasticSearch"
    exit 1
fi
systemctl enable elasticsearch && systemctl start elasticsearch
if (( $? != 0 ))
then
    echo "[ERROR] Failed to enable and run ElasticSeatch"
    exit 1
fi
# Wait then test
sleep 5
wget "http://localhost:9200" -P /tmp
if (( $? != 0 ))
then
    echo "[ERROR] Failed to find running ElasticSearch"
    exit 1
fi
rm -f /tmp/index.html
####
# Install Nginx Config
####
ln -s ${SCRIPT_DIR}/server/conf/repair-app /etc/nginx/sites-enabled/
systemctl enable nginx && systemctl start nginx
if (( $? != 0 ))
then
    echo "[ERROR] Failed to enable and run Nginx"
    exit 1
fi
####
# Setup repair-cafe group
####
groupadd -f repaircafe && usermod -a -G repaircafe ${SUDO_USER}
if (( $? != 0 ))
then
    echo "[ERROR] Failed to create repair-cafe group, and add ${SUDO_USER}"
    exit 1
fi
chgrp -R repaircafe /var/www/html/ && chmod g+rwxs /var/www/html/
if (( $? != 0 ))
then
    echo "[ERROR] Failed to add permissions to /var/www/html/"
    exit 1
fi
####
# Setup Passwd file
####
htpasswd -c /etc/nginx/passwd-rc rcuser

