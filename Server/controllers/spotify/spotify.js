const credentials = require('./private');
var axios = require('axios');
var querystring = require('querystring');

const SPOTIFY_GET_TOKEN = 'https://accounts.spotify.com/api/token'

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
    client_secret: credentials.CLIENT_SECRET
  }
  const request = axios.post(SPOTIFY_GET_TOKEN, querystring.stringify(data), config)
  return request;
}

function swap(code) {
  var headers = {
    "Content-Type":'application/x-www-form-urlencoded'
}

var config = {
  headers: headers
}
var data = {
  grant_type: 'authorization_code',
  code: code,
  redirect_uri: credentials.REDIRECT_URL,
  client_id: credentials.CLIENT_ID,
  client_secret: credentials.CLIENT_SECRET
}
console.log(data)

const request = axios.post(SPOTIFY_GET_TOKEN, querystring.stringify(data), config)

  return request;
}

module.exports = {
  refresh,
  swap
}
