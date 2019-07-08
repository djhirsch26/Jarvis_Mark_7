var express = require('express')
var router = express.Router()

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
    res.send(data)
  }).catch(err => {
    console.log(err)
    // res.send({})
    res.status(500).send({message: 'Directory Does not exist '})
    // return res.status(500).send({message: 'Directory Does no '})
  })
})

router.get('/fetch', function(req, res) {
  console.log(req.query.path)
  SFTP.fetch(req.query.path).then((src) => {
    console.log(data)
    src.pipe(res)
    // res.send(data)
  }).catch(err => {
    console.log(err)
    // res.send({})
    res.status(500).send({message: 'Failed to fetch file at ' + req.query.path})
    // return res.status(500).send({message: 'Directory Does no '})
  })
})

module.exports = router
