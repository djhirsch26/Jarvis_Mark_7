#! /bin/bash

# Update Packages
apt-get update
apt-get dist-upgrade

# Get Useful packages
apt-get install -y build-essential \
    nano \
    git \
    bluetooth \
    bluez \
    libbluetooth-dev \
    libudev-dev

# Get Node v10
# Deprecated
# curl -k -o node-v10.21.0-linux-armv6l.tar.gz https://nodejs.org/dist/latest-v10.x/node-v10.21.0-linux-armv6l.tar.gz
# tar -xzf node-v10.21.0-linux-armv6l.tar.gz
# sudo cp -r node-v10.21.0-linux-armv6l/* /usr/local/
# sudo rm node-v10.21.0-linux-armv6l.tar.gz
# sudo rm -r node-v10.21.0-linux-armv6l

# Get Node v14
# curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
# sudo apt-get install -y nodejs
# Get current node version
# curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
# sudo apt-get install -y nodejs


# mkdir -p /Jarvis/src/bluetooth
# pushd /Jarvis/src/bluetooth > /dev/null
# npm install @abandonware/bleno
# popd > /dev/null

# Get Python (for bleno) and python3
apt-get install -y python3-pip

# Set the PYTHON env variable
# export PYTHON=/usr/bin/python3
# pip install --upgrade setuptools wheel

# Get npm
# sudo apt-get install npm
