#!/bin/bash
# file: chrootjail.sh

mkdir -p /var/jail/{dev,etc,lib,lib64,usr,bin}
mkdir -p /var/jail/usr/bin
chown root.root /var/jail
# You also need the /dev/null file:
mknod -m 666 /var/jail/dev/null c 1 3

# You need to fill up the etc directory with a few minimum files:
cd /var/jail/etc
cp /etc/ld.so.cache .
cp /etc/ld.so.conf .
cp /etc/nsswitch.conf .
cp /etc/hosts .
# Once this is done you need to figure out what commands you want accessible by
# your limited users. In this example I only want the users to be able to get
# into bash and use the ls command. So you must copy the binaries to the jail.
#ME: I also want mkdir and cp

cd /var/jail/bin
cp /bin/ls .
cp /bin/bash .
cp /bin/mkdir .
cp /bin/cp .

# Get l2chroot
cd /sbin
wget -O l2chroot http://www.cyberciti.biz/files/lighttpd/l2chroot.txt
chmod +x l2chroot

sed -i 's/webroot/var\/jail/g' l2chroot
# Edit the l2chroot file and change BASE=”/webroot” to BASE=”/var/jail”. This tells l2chroot where your jail is located so it copies everything to the right place. Now go ahead and run the command on the binaries you want.

# Now use l2chroot
cd /var/jail/usr/bin
l2chroot ls
l2chroot bash
l2chroot mkdir
l2chroot cp
