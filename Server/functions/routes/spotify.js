var express = require('express')
var router = express.Router()

const auth = require('../controllers/auth')
const Spotify = require('../controllers/spotify')

// We do not do Firebase Authentication for refresh and swap.
// router.use(auth.firebase.verifyToken)

router.get('/', (req, res) => {
  res.send('Empty Spotify Command')
})

router.get('/test', (req, res) => {
  // console.log(req,res)
  res.send('Test Spotify Command')
})

router.get('/redirect', (req, res) => {
  // console.log(req,res)
  console.log("Redirection")
  res.send('Test Spotify Redirect')
})

router.post('/refresh', (req, res) => {
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
    return result.data
  }).catch((e) => {
    console.log(e)
    res.send(e)
  });
})

router.post('/swap', (req, res) => {
  console.log("Spotify Swap Called")
  const request = Spotify.swap(req.body.code)

  //SEND REQUEST
  request.then((result) => {
    res.json(result.data);
    return result.data
  }).catch((e) => {
    console.log(e)
    res.send(e)
  });
})

module.exports = router
