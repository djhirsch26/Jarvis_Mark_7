#! /bin/bash

# Must set default user
# https://stackoverflow.com/questions/44633419/no-access-permission-error-with-npm-global-install-on-docker-image
npm -g config set user root

# Get mqtt and bleno for Communication
npm install -g mqtt @abandonware/bleno axios

# Get dependencies of the above packages. Due to npm link not properly getting dependencies.
npm install -g mkdirp browserify uglifyjs
