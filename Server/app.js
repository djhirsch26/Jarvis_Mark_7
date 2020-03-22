var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var bodyParser = require('body-parser')

// Initialize Firebase First
var firebase = require('firebase-admin');
var credentials = require("../Credentials/jarvis-503c9-f7e92b67b8ee.json");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: 'https://jarvis-503c9.firebaseio.com/',
  storageBucket: 'jarvis-503c9.appspot.com',
});


const fileServer = require('./controllers/file').file
fileServer.connect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(require('./routes'))

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
