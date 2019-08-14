var express = require('express')
var router = express.Router()

const streamToBlob = require('stream-to-blob')
const Readable = require('stream').Readable;
const fs = require('fs');
const auth = require('../controllers/auth')

// Do Firebase Authentication before doing anything
// router.use(auth.firebase.verifyToken)

router.get('/', function(req, res) {
  res.send('Empty File Command')
})

router.get('/test', function(req, res) {
  // console.log(req,res)
  res.send('Test Command')
})

router.get('/ls', function(req, res) {
  console.log(req.query.path)
  SFTP.ls(req.query.path).then((data) => {
    // console.log(data)
    res.send(data)
  }).catch(err => {
    console.log(err)
    // res.send({})
    res.status(500).send({message: 'Directory Does not exist '})
    // return res.status(500).send({message: 'Directory Does no '})
  })
})

router.post('/fetch', function(req, res) {
  console.log('Fetching Data at ', req.body.path);

  SFTP.fetch(req.body.path, req.body.path).then((data) => {
    const readStream = fs.createReadStream(data);
    readStream.on('open', function () {
      readStream.pipe(res);
    });
    readStream.on('error', function(err) {
      console.log(error)
      res.end(err);
    });

    // res.send('MAWHAAHAH\n')
  }).catch((error) => {
    console.log(error);
  })
    // res.writeHead(200, {
    //     'Content-Type': mimetype,
    //     'Content-disposition': 'attachment;filename=' + 'filename',
    //     'Content-Length': data.length
    // });
  //   res.end(new Buffer(data, 'binary'));
  //   // console.log('PIPING DATA BACK')
  //   // res.send(await streamToBlob(s))
  // }).catch(err => {
  //   console.log(err)
  //   // res.send({})
  //   res.status(500).send({message: 'Failed to fetch file at ' + req.query.path})
  //   // return res.status(500).send({message: 'Directory Does no '})
  // })
})

module.exports = router
