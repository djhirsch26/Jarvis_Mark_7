var express = require('express')
var router = express.Router()

const auth = require('../controllers/auth')

// Do Firebase Authentication before doing anything
router.use(auth.firebase.verifyToken)

router.get('/', function(req, res) {
  res.send('Empty File Command')
})

router.get('/ls', function(req, res) {
  res.send('I am the ls command')
})

module.exports = router
