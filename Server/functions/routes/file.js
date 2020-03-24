var express = require('express')
var router = express.Router()

const streamToBlob = require('stream-to-blob')
const Readable = require('stream').Readable;
const fs = require('fs');
const auth = require('../controllers/auth')

// FileServer is a global constant defined in controllers/file/file.js

// Do Firebase Authentication before doing anything
router.use(auth.firebase.verifyToken)

router.get('/', (req, res) => {
  res.send('Empty File Command')
})

router.get('/test', (req, res) => {
  // console.log(req,res)
  res.send('Test Command')
})

router.get('/ls', (req, res) => {
  FileServer.ls(req.query.path).then((data) => {
    res.send(data)
    return data
  }).catch(err => {
    res.status(500).send(err)
  })
})

router.post('/fetch', (req, res) => {
  FileServer.fetch(req.body.path).then((data) => {
    const readStream = data;
    readStream.pipe(res);
    return readStream
    // res.send('MAWHAAHAH\n')
  }).catch((error) => {
    console.log(error);
    res.end(error);
  })
})

module.exports = router
