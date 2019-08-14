## Jarvis Mark 7 Notes

### Local File Server
In order to run a local file server:

```
docker run -d -v /Users/daniel/Documents/Jarvis/Jarvis_Mark_7/Docker:/web -p 8080:8080 halverneus/static-file-server:latest
```

This comes from [here](https://hub.docker.com/r/halverneus/static-file-server/)

In order to run the ubuntu container with sshd

<hr/>

### Local Sshd Server
```
$ docker run -d -P -v /Users/daniel/Documents/Jarvis/Jarvis_Mark_7/Docker:/Documents --name test_sshd rastasheep/ubuntu-sshd:18.04
$ docker port test_sshd 22

$ ssh root@localhost -p <USER PORT>
 ```

 This one has the nice property that it can run in the background.
 I found this one [here](https://hub.docker.com/r/rastasheep/ubuntu-sshd/)

<hr/>

Remove Untagged Containers, found [here](https://zaiste.net/removing_docker_containers/)
```
docker ps -aq --no-trunc -f status=exited | xargs docker rm
```

<hr/>

To build a Dockerfile run:
```
docker build --tag=jarvis .
```
You should be in the directory with the Dockerfile
You can see the image by running `docker image ls`

To run this image run:
```
$ docker run -d -p 3030:22 -v /Users/daniel/Documents/Jarvis/Jarvis_Mark_7/Docker:/home/jarvis/Documents -v /Users/daniel/Documents:/var/jail/Documents  jarvis:latest

$ ssh root@localhost -p <PORT>

where port is 3030
or
$ ssh jarvis@localhost -p 3030
```

Username is jarvis, Password is jarvis.
The -p flag is <host>:<container>


<br/>

Stuff on chroot jail
https://allanfeid.com/content/creating-chroot-jail-ssh-access
