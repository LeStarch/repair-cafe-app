#!/bin/sh

read -p "Username:" user
read -p "Password:" pass
read -p "Date:" date
for index in repairs-${date} tickets-${date}
do
    curl -X DELETE -k "https://${user}:${pass}@192.168.0.12/elastic/${index}"
    curl -X PUT -k "https://${user}:${pass}@192.168.0.12/elastic/${index}"
done
