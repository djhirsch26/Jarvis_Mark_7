import Spotify from 'rn-spotify-sdk';

import {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
  SCOPES
} from './private/spotify'

import {
  SPOTIFY_TOKEN_REFRESH,
  SPOTIFY_TOKEN_SWAP,
} from '../../constants'


class SpotifyController {

  loggedIn_ = false;

  constructor(audioEvents) {
    console.log('BUILD ME UP');
    this.audioEvents = audioEvents
    console.log({
        clientID: CLIENT_ID,
        redirectURL: REDIRECT_URL,
        scopes: SCOPES,
        tokenRefreshURL: SPOTIFY_TOKEN_REFRESH,
        tokenSwapURL: SPOTIFY_TOKEN_SWAP,
    })

    var request = Spotify.initialize({
        clientID: CLIENT_ID,
        redirectURL: REDIRECT_URL,
        scopes: SCOPES,
        tokenRefreshURL: SPOTIFY_TOKEN_REFRESH,
        tokenSwapURL: SPOTIFY_TOKEN_SWAP,
    })

    request.then((loggedIn) => {
      console.log("Successful Spotfy Init", loggedIn)
      this.loggedIn_ = loggedIn;

      // Log In if not already
      if (!loggedIn) {
        const request = Spotify.login({
          showDialog: false
        })
        request.then((success) => {
          console.log("Successful Spotfy Login", success)
          this.loggedIn_ = true;
        }).catch((e) => {
          console.log("Failed Spotify Login", e)
        })
      }

    }).catch((e) => {
      console.log("Failed Spotify Init", e)
    })

    Spotify.addListener('login', (data) => {
      // console.log('Login Event', data)
      const request = this.getTracks('1TIzQuYM2bG6X6giwGaISF')
      request.then((tracks) => {
        this.audioEvents.emit('update_tracks', tracks)
      }).catch((e) => {
        console.log('error', e)
      })
    })

  }

  isLoggedIn() {
    return this.loggedIn_;
  }

  getTracksInternal_(playlist_id, resolve, reject, limit=100, offset=0, items=[]) {
    console.log("URL", 'v1/playlists/' + playlist_id + '/tracks')
    const request = Spotify.sendRequest('v1/playlists/' + playlist_id + '/tracks', 'GET', {limit, offset}, false)
    request.then((tracks) => {
      console.log("Tracks", tracks)
      items = items.concat(tracks.items)
      if (tracks.offset + tracks.limit < tracks.total) {
        this.getTracksInternal_(playlist_id, resolve, reject, limit, tracks.offset + limit, items)
      } else {
        resolve(items)
      }
    }).catch((e) => {
      console.log(e)
      reject(e)
    })
  }

  getTracks(playlist_id) {
    const promise = new Promise((resolve, reject) => {
      this.getTracksInternal_(playlist_id, resolve, reject)
    });



    // promise.then((tracks) => {
    //   console.log("I DID IT", tracks)
    // }).catch((e) => {
    //   console.log("Failed to do it", e)
    // })

    return promise;
  }

  pause() {
    return Spotify.setPlaying(false);
  }

  resume() {
    const state = Spotify.getPlaybackStateAsync()
    state.then((state) => {
      console.log("Playback state", state)
      if (!state.playing) {
        Spotify.setPlaying(true);
        this.audioEvents.emit('play', {})
      }
    }).catch((e) => {
      console.log('error fetch', e)
    })
    // console.log(state)
    return true;
  }

  playURI(spotifyURI, startIndex=0, startPosition=0, extraData={}) {
    const request = Spotify.playURI(spotifyURI, startIndex, startPosition)
    request.then((success) => {
      this.audioEvents.emit('play', {
        uri: spotifyURI,
        controller: 'SPOTIFY',
        ...extraData
      })
    }).catch((e) => {
      console.log("Failed To Start Spotify Track", e)
    })
  }

  onTrackSelect(track) {
    return this.playURI(track.track.uri, 0, 0, track)
  }
}

export default SpotifyController;
