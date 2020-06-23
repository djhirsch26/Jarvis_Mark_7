## Raspberry Pi Info

Pi has static address on "Herbert Hirsch's Network" of 10.0.1.10. To ssh in over wifi, run
```
ssh pi@10.0.1.10
```

### Setup

On the Pi, run
```
curl -sSL https://get.docker.com | sh
sudo usermod -aG docker pi
```

We will be using a base Raspbian Docker Image `docker run -it balenalib/rpi-raspbian /bin/bash`

In the `RPi/docker` directory, there are a bunch of set up files for docker that can be transfered from the host (my mac) to the Pi. Use the command `rsync -a ./docker/ pi@10.0.1.10:/home/pi/Jarvis/docker` to sync local and pi.

**Note:** this will override the contents of the docker directory on the pi

You can then build using `docker build -t jarvis .`
Run the image with `docker run -it --privileged jarvis`

### Useful RSyncs/Commands
1. Sync Docker: `rsync -a ./docker/ pi@10.0.1.10:/home/pi/Jarvis/docker`
2. Sync Source: `rsync -a ./src/ pi@10.0.1.10:/home/pi/Jarvis/src`
3. Build Docker: `docker build -t jarvis /home/pi/Jarvis/docker`
4. Run Docker: `docker run -d --privileged -p 8080:8080 --net host --volume /home/pi/Jarvis/src:/Jarvis/src jarvis` or `docker run -it --privileged -p 8080:8080 --net host  --volume /home/pi/Jarvis/src:/Jarvis/src jarvis`
5. Observe Background Container: `docker exec -it --user jarvis <container-id> /bin/bash`



### TODOs
* At some point, fix mqtt to be a global link, this is for dockerization. 
