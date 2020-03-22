var admin = require('firebase-admin');

class FirebaseFileServer {
  constructor() {
    // Initialize New File Server
    this.bucket = admin.storage().bucket()
  }

  ls(pathname) {
    console.log('Pathname: ', pathname)
    const promise = new Promise((resolve, reject) => {
      if (!pathname) {
        reject("Invalid Pathname in call to ls");
      }

      var prefix;
      if (pathname.charAt(0) == '/') {
        if (pathname == '/') {
          prefix = ''
        } else {
          prefix = pathname.substring(1) + '/'
        }
      }

      // Source files from the Google Bucket
      this.bucket.getFiles({
        autoPaginate: false,
        delimiter: '/',
        prefix: prefix,
      }).then((data) => {
        console.log(data)

        var files = data[0].map((file) => {
          var name = file.name.split("/")
          name = name[name.length - 1]
          return {name: name, type: '-'}
        })

        var directories = [];
        var apiResponse = data[2];
        if (apiResponse.prefixes) {
          console.log(apiResponse.prefixes)
          directories = apiResponse.prefixes.map((dir) => {
            dir = dir.substring(0, dir.length - 1)
            dir = dir.split("/")
            dir = dir[dir.length - 1]
            return {name: dir, type: 'd'}
          })
        }

        resolve(files.concat(directories))
      })
    })

    return promise;
  }

  fetch(pathname) {
    const filename = pathname.substring(1)
    console.log(filename)
    const promise = new Promise((resolve, reject) => {
      this.bucket.getFiles({
        prefix: filename,
      }).then((data) => {
        const files = data[0]
        if (files.length != 1) {
           reject("Unable to fetch file at: " + filename)
        } else {
          resolve(files[0].createReadStream())
        }
      })
    })

    return promise;
  }


}

module.exports = FirebaseFileServer
