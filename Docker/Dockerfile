FROM rastasheep/ubuntu-sshd:18.04

RUN apt-get update && \
      apt-get -y install \
      sudo \
      vim \
      nano \
      silversearcher-ag

RUN useradd -ms /bin/bash jarvis -p jarvis && \
    echo "jarvis ALL=(root) NOPASSWD:ALL" >> /etc/sudoers

COPY .bashrc /home/jarvis/.bashrc

RUN echo 'jarvis:jarvis' | chpasswd

WORKDIR /home/jarvis/

RUN ["/bin/bash", "-c", "source .bashrc"]



# We don't want/need to to run a shell on boot
# CMD /bin/bash
