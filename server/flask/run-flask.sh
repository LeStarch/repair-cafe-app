#!/bin/bash
DIR="$(dirname ${BASH_SOURCE})"
#Activate python
. ${DIR}/../python/bin/activate

#Run both with logging
python3 ./sender.py >& ${DIR}/sender.log &
FLASK_APP=rcflask.py flask run >& ${DIR}/flask.log &
