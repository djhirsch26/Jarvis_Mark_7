var express = require('express')
var router = express.Router()

router.use('/file', require('./file'))

router.get('/', function(req, res) {
  res.send('Hello World!');
})

module.exports = router
