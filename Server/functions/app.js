const functions = require('firebase-functions')
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var cors = require('cors')
var bodyParser = require('body-parser')
var utils = require('./utils')

// Initialize Firebase First
var firebase = require('firebase-admin');
var credentials = require("./Credentials/jarvis-503c9-f7e92b67b8ee.json");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: 'https://jarvis-503c9.firebaseio.com/',
  storageBucket: 'jarvis-503c9.appspot.com',
});


const fileServer = require('./controllers/file').file
fileServer.connect()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(require('./routes'))

// app.listen(port, () => {
//   console.log('Example app listening on port ' + port + '!');
// }).on('error', (err) => {
//   if (err) {
//     // If we have too many call's simultaneously, we should just wait 1 second and then try again
//     utils.sleep(1000).then(() => {
//       app.listen(port, () => {
//         console.log('Example app(2) listening on port ' + port + '!');
//       })
//       return;
//     }).catch(()=>{})
//   }
// });

const app_ = functions.https.onRequest(app)

module.exports = {
  app: app_
}
