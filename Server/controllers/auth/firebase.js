var admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://jarvis-503c9.firebaseio.com/'
});

function verifyToken(req, res, next) {
  const idToken = req.headers.authorization ? req.headers.authorization : '';

  console.log('AQUI')
  console.log(req.headers.authorization)

  admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
      let uid = decodedToken.user_id;
      req.params.uid = uid;
      next()
    }).catch(function(error) {
      // Handle error
      console.log(error)
      res.status(401).send("User is not authorized")
    });
}

module.exports = {
  verifyToken,
}
