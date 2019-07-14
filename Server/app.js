var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var bodyParser = require('body-parser')


const fileServer = require('./controllers/file')
fileServer.connect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(require('./routes'))

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
