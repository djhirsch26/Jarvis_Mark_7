var express = require('express')
var router = express.Router()
const parser = require('../controllers/parser')

parser.init()

router.post('/', (req, res) => {
  const input = req.body.message
  console.log('Getting Text Request: ', req.body.message)
  const command = parser.parseText(req.body.message).then((command) => {
    console.log("Reponse: ", command)
    res.send(command)
  })
})

module.exports = router
