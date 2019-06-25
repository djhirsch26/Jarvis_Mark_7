var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();

app.use(require('./routes'))

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
