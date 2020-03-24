// module.exports = {
//   SPOTIFY_REDIRECT_URL: 'https://us-central1-jarvis-503c9.cloudfunctions.net/app/spotify/redirect',
// }

const BASE_URL = 'http://us-central1-jarvis-503c9.cloudfunctions.net/app'
// const BASE_URL = 'http://localhost:5001/jarvis-503c9/us-central1/app'
//
module.exports = {
  BASE_URL,
  SPOTIFY_REDIRECT_URL: BASE_URL + '/spotify/redirect'
}
