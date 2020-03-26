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

  constructor() {
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
      const playlist = '1TIzQuYM2bG6X6giwGaISF'
      const request = this.getTracks(playlist)
      request.then((tracks) => {
        tracks = tracks.map(track => {
          track.playlist = playlist
          return track;
        })
        global.audioEvents.emit('update_tracks', tracks)
      }).catch((e) => {
        console.log('error', e)
      })
    })

    Spotify.addListener('trackChange', (data) => {
      const trackInfo = {
        name: data.metadata.currentTrack.name,
        index: data.metadata.currentTrack.indexInContext,
        duration: data.metadata.currentTrack.duration,
      }
      const playerInfo = {
        playing: data.state.playing,
        position: data.state.position,
        repeating: data.state.repeating,
        shuffling: data.state.shuffling,
      }
      global.audioEvents.emit('track_change', trackInfo, playerInfo)
    })

  }

  isLoggedIn() {
    return this.loggedIn_;
  }

  getTracksInternal_(playlist_id, resolve, reject, limit=100, offset=0, items=[]) {
    const request = Spotify.sendRequest('v1/playlists/' + playlist_id + '/tracks', 'GET', {limit, offset}, false)
    request.then((tracks) => {
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

    return promise;
  }

  pause() {
    return Spotify.setPlaying(false);
  }

  resume() {
    const state = Spotify.getPlaybackStateAsync()
    state.then((state) => {
      if (!state.playing) {
        Spotify.setPlaying(true);
        global.audioEvents.emit('play', {})
      }
    }).catch((e) => {
      console.log('Error Fetching Playback State', e)
    })
    return true;
  }

  playURI(spotifyURI, startIndex=0, startPosition=0, extraData={}) {
    const request = Spotify.playURI(spotifyURI, startIndex, startPosition)
    request.then((success) => {
      global.audioEvents.emit('play', {
        uri: spotifyURI,
        controller: 'SPOTIFY',
        ...extraData
      })
    }).catch((e) => {
      console.log("Failed To Start Spotify Track", e)
    })
  }

  onTrackSelect(track) {
    if (track.playlist) {
      const uri = 'spotify:playlist:' + track.playlist;
      return this.playURI(uri, track.index, 0, track)
    }
    return this.playURI(track.track.uri, 0, 0, track)
  }

  onNext() {
    const request = Spotify.skipToNext();
    request.then((data) => {
      console.log("Next", data)
      global.audioEvents.emit('next', {
        data
      })
    }).catch((e) => {
      console.info('Failed To Next Track', e)
    })
  }

  onPrev() {
    const request = Spotify.skipToPrevious();
    request.then((data) => {
      console.log("Previous", data)
      global.audioEvents.emit('previous', {
        data
      })
    }).catch((e) => {
      console.info('Failed To Previous Track', e)
    })
  }

  onSeek(position=0) {
    const request = Spotify.seek(position);
    request.then((data) => {
      console.log("Seek", data)
      global.audioEvents.emit('seek', {
        data
      })
    }).catch((e) => {
      console.info('Failed To Seek Track', e)
    })
  }
}

export default SpotifyController;
