#!/bin/bash
for i in `seq 50 200`
do
   (
       ssh  -o BatchMode=yes -o StrictHostKeyChecking=no  pi@192.168.0.${i} "sudo date -s $(date -Iseconds)" 2>/dev/null
   ) &
   sleep 0.1
done
