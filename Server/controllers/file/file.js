// const credentials = require('./private/jarvisLogin')
// let Client = require('ssh2-sftp-client');
var path_ = require('path');
var admin = require('firebase-admin');
const FirebaseFileServer = require('./FirebaseFileServer')


function connect(req, res, next) {
  const server = new FirebaseFileServer()

  global.FileServer = {
    ls: (pathname=undefined) => {
      return server.ls(pathname)
    },
    fetch: (pathname, destination) => {
      return server.fetch(pathname, destination)  
    },
  }
}

module.exports = {
  connect,
}
