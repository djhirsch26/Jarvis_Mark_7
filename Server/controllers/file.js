const credentials = require('./private/jarvisLogin')
let Client = require('ssh2-sftp-client');

function connect(req, res, next) {
  console.log('CONNECTING TO SSH CLIENT')

  let sftp = new Client();

  console.log(credentials.JARVIS_HOST, credentials.JARVIS_PORT, credentials.JARVIS_USERNAME,credentials.JARVIS_PASSWORD)

  sftp.connect({
    host: '127.0.0.1',
    port: '3030',
    username: 'jarvisRemote',
    password: 'jarvis'
  }).then(() => {
      return sftp.list('/');
  }).then((data) => {
      console.log(data, 'the data info');
  }).catch((err) => {
      console.log(err, 'catch error');
  });

  global.SFTP = {
    ls: (pathname='/') => sftp.list(pathname)
  }
}

module.exports = {
  connect,
}
