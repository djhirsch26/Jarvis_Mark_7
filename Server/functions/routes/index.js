var express = require('express')
var router = express.Router()

router.use('/file', require('./file'))
router.use('/spotify', require('./spotify'))
router.use('/parse', require('./parse'))

router.get('/', (req, res) => {
  res.send('Hello World!');
})

module.exports = router
