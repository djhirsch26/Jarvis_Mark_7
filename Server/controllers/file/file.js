const credentials = require('./private/jarvisLogin')
let Client = require('ssh2-sftp-client');
var path_ = require('path');


function connect(req, res, next) {
  console.log('CONNECTING TO SSH CLIENT')

  let sftp = new Client();

  sftp.connect({
    host: '127.0.0.1',
    port: '3030',
    username: 'jarvisRemote',
    password: 'jarvis'
  }).then(() => {
      return sftp.list('/');
  }).then((data) => {
      // console.log(data, 'the data info');
  }).catch((err) => {
      // console.log(err, 'catch error');
  });

  global.SFTP = {
    ls: (pathname='/') => sftp.list(pathname),
    fetch: (pathname, destination) => {
      const path = './tmp/' + destination.substring(1).replace(/\//g, '_');

      var encoding = 'utf8'
      const binaryTypes = [".mp3", ".mp4", ".wav", ".doc", ".docx", ".pdf", ".pptx", "xlsx", ".png", ".img", "jpg"];
      if (binaryTypes.includes(path_.extname(destination))) {
        encoding = null;
        console.log('Fetching Audio')
      }
      const request = sftp.get(pathname, path, {encoding: encoding});
      return request;
    },
  }
}

module.exports = {
  connect,
}
