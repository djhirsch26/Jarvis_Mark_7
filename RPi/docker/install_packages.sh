#! /bin/bash

# Update Packages
sudo apt-get update
sudo apt-get dist-upgrade

# Get Useful packages
sudo apt-get install -y build-essential \
    nano \
    git \
    bluetooth \
    bluez \
    libbluetooth-dev \
    libudev-dev

# Get Node
curl -k -o node-v10.21.0-linux-armv6l.tar.gz https://nodejs.org/dist/latest-v10.x/node-v10.21.0-linux-armv6l.tar.gz
tar -xzf node-v10.21.0-linux-armv6l.tar.gz
sudo cp -r node-v10.21.0-linux-armv6l/* /usr/local/
sudo rm node-v10.21.0-linux-armv6l.tar.gz
sudo rm -r node-v10.21.0-linux-armv6l

# mkdir -p /Jarvis/src/bluetooth
# pushd /Jarvis/src/bluetooth > /dev/null
# npm install @abandonware/bleno
# popd > /dev/null

# Get Python
sudo apt-get install python-pip
# pip install --upgrade setuptools wheel
