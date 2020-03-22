var express = require('express')
var router = express.Router()

const auth = require('../controllers/auth')
const Spotify = require('../controllers/spotify').spotify

// Do Firebase Authentication before doing anything
// router.use(auth.firebase.verifyToken)

router.get('/', function(req, res) {
  res.send('Empty Spotify Command')
})

router.get('/test', function(req, res) {
  // console.log(req,res)
  res.send('Test Spotify Command')
})

router.get('/redirect', function(req, res) {
  // console.log(req,res)
  res.send('Test Spotify Redirect')
})

router.post('/refresh', function(req, res) {

  console.log("Spotify Refresh Called")

  // ensure refresh token parameter
	if (!req.body.refresh_token) {
		res.status(400).json({error: 'Refresh token is missing from body'});
		return;
	}

  const request = Spotify.refresh(req.body.refresh_token)

  //SEND REQUEST
  request.then((result) => {
    res.json(result.data);
  }).catch((e) => {
    console.log(e)
    res.send(e)
  });
})

router.post('/swap', function(req, res) {
  console.log("Spotify Swap Called")
  const request = Spotify.swap(req.body.code)

  //SEND REQUEST
  request.then((result) => {
    res.json(result.data);
  }).catch((e) => {
    console.log(e)
    res.send(e)
  });
})

module.exports = router
