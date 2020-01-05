FROM rastasheep/ubuntu-sshd:18.04

RUN apt-get update && \
      apt-get -y install \
      sudo \
      vim \
      nano \
      sed \
      silversearcher-ag \
      curl


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
RUN chmod a+w /home/jarvis/.bashrc
COPY .bashrc /home/jarvisRemote/.bashrc
COPY .bashrc /home/jarvisRemote/.bashrc
COPY ./overlay/etc/ssh/sshd_config /etc/ssh/sshd_config

# Set their passwords
RUN echo 'jarvis:jarvis' | chpasswd
RUN echo 'jarvisRemote:jarvis' | chpasswd

# Add ssh keys
ADD ./overlay/.ssh /home/jarvis/.ssh

# Create Google Cloud Directories
RUN mkdir -p /home/jarvis/GCloud/
COPY ./overlay/sync_files.sh /home/jarvis/GCloud
RUN chmod +x /home/jarvis/GCloud/sync_files.sh

WORKDIR /home/jarvisRemote/
RUN ["/bin/bash", "-c", "source .bashrc"]

WORKDIR /home/jarvis/
RUN ["/bin/bash", "-c", "source .bashrc"]

# Change to Jarvis User
USER jarvis

# Install gsutil software
RUN curl https://sdk.cloud.google.com | bash
RUN ["/bin/bash", "-c", "source .bashrc"]
COPY ./overlay/jarvis-503c9-f7e92b67b8ee.json /home/jarvis/GCloud
RUN ["/bin/bash", "-c", "/home/jarvis/google-cloud-sdk/bin/gcloud auth activate-service-account --key-file /home/jarvis/GCloud/jarvis-503c9-f7e92b67b8ee.json"]

USER root

# We don't want/need to to run a shell on boot
# CMD /bin/bash
