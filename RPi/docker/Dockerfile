FROM balenalib/rpi-raspbian

RUN useradd -ms /bin/bash jarvis -p jarvis && \
    echo "jarvis ALL=(root) NOPASSWD:ALL" >> /etc/sudoers

COPY install_packages.sh .
RUN chmod +x install_packages.sh && ./install_packages.sh
RUN rm install_packages.sh

COPY install_npm_packages.sh .
RUN chmod +x install_npm_packages.sh && ./install_npm_packages.sh
RUN rm install_npm_packages.sh

VOLUME /Jarvis/src

COPY docker-bashrc /home/jarvis/.bashrc
EXPOSE 8080

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
