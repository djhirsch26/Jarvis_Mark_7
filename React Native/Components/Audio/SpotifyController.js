import Spotify from 'rn-spotify-sdk';
import {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
  SCOPES
} from './private/spotify'

import {
  SPOTIFY_TOKEN_REFRESH
} from '../../constants'


class SpotifyController {
  constructor() {
    console.log('BUILD ME UP');
    var request = Spotify.initialize({
        clientID: CLIENT_ID,
        redirectURL: REDIRECT_URL,
        scopes: SCOPES,
        tokenRefreshURL: SPOTIFY_TOKEN_REFRESH,
    })
    request.then((success) => {
      console.log("Successful Spotfy Login", success)
    }).catch((e) => {
      console.log("Failed Spotify Login", e)
    })
  }
}

export default SpotifyController;
