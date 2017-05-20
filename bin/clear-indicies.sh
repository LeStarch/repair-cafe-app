#!/bin/sh

read -p "Username:" user
read -p "Password:" pass
for index in repairs repairers tickets
do
    curl -X DELETE -k "https://${user}:${pass}@192.168.0.2/elastic/${index}"
    curl -X PUT -k "https://${user}:${pass}@192.168.0.2/elastic/${index}"
done
