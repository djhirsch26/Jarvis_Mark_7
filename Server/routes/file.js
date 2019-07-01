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
    // console.log(data)
    res.send(data)
  }).catch(err => {
    console.log(err)
    res.send({})
    // return res.status(500).send({message: 'Directory Does no '})
  })
})

module.exports = router
