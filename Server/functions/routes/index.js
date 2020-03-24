var express = require('express')
var router = express.Router()

router.use('/file', require('./file'))
router.use('/spotify', require('./spotify'))

router.get('/', (req, res) => {
  res.send('Hello World!');
})

module.exports = router
