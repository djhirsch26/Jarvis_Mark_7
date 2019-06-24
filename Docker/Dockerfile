FROM rastasheep/ubuntu-sshd:18.04

RUN apt-get update && \
      apt-get -y install \
      sudo \
      vim \
      nano \
      sed \
      silversearcher-ag

# Create Chroot jail
COPY ./chrootjail.sh /tmp
COPY .bashrc /tmp
RUN chmod +x /tmp/chrootjail.sh
RUN /tmp/chrootjail.sh


# Add Users
RUN useradd -ms /bin/bash jarvis -p jarvis && \
    echo "jarvis ALL=(root) NOPASSWD:ALL" >> /etc/sudoers
RUN useradd -ms /bin/bash jarvisRemote -p jarvis && \
    echo "jarvisRemote ALL=(root) NOPASSWD:ALL" >> /etc/sudoers

# Set their bashrcs
COPY .bashrc /home/jarvis/.bashrc
COPY .bashrc /home/jarvisRemote/.bashrc
COPY .bashrc /home/jarvisRemote/.bashrc
COPY ./overlay/etc/ssh/sshd_config /etc/ssh/sshd_config

# Set their passwords
RUN echo 'jarvis:jarvis' | chpasswd
RUN echo 'jarvisRemote:jarvis' | chpasswd

WORKDIR /home/jarvisRemote/
RUN ["/bin/bash", "-c", "source .bashrc"]

WORKDIR /home/jarvis/
RUN ["/bin/bash", "-c", "source .bashrc"]



# We don't want/need to to run a shell on boot
# CMD /bin/bash
