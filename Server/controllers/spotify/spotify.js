const credentials = require('./private');

function refresh(refresh_token) {
  var headers = {
    "Content-Type":'application/x-www-form-urlencoded'
  }

  var config = {
    headers: headers
  }

  var data = {
    grant_type: 'refresh_token',
    refresh_token: refresh_token,
    client_id: credentials.CLIENT_ID,
    client_secret: credentials.CLIENT_SECTET
  }
  console.log(data)
  const request = axios.post(SPOTIFY_GET_TOKEN, querystring.stringify(data), config)
  return request;
}

module.exports = {
  refresh,
}
