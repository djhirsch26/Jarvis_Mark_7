#! /bin/bash
docker ps -q | xargs --no-run-if-empty docker kill
docker ps -aq | xargs --no-run-if-empty docker rm
docker images | grep '<none>' | awk '{print $3}' | xargs --no-run-if-empty docker rmi
