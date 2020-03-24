var admin = require('firebase-admin');

function verifyToken(req, res, next) {
  const idToken = req.headers.authorization ? req.headers.authorization : '';

  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      let uid = decodedToken.user_id;
      req.params.uid = uid;
      next()
      return;
    }).catch((error) => {
      // Handle error
      console.log(error)
      res.status(401).send("User is not authorized")
    });
}

module.exports = {
  verifyToken,
}
