import Spotify from 'rn-spotify-sdk';

import {
  CLIENT_ID,
  CLIENT_SECRET,
  SCOPES
} from './private/spotify'

import {
  SPOTIFY_TOKEN_REFRESH,
  SPOTIFY_TOKEN_SWAP,
  SPOTIFY_REDIRECT_URL,
} from '../../constants'


class SpotifyController {

  loggedIn_ = false;

  static init() {
    console.log(CLIENT_ID, SPOTIFY_REDIRECT_URL, SCOPES,SPOTIFY_TOKEN_REFRESH ,SPOTIFY_TOKEN_SWAP)
    var request = Spotify.initialize({
        clientID: CLIENT_ID,
        redirectURL: SPOTIFY_REDIRECT_URL,
        scopes: SCOPES,
        tokenRefreshURL: SPOTIFY_TOKEN_REFRESH,
        tokenSwapURL: SPOTIFY_TOKEN_SWAP,
    })

    request.then((loggedIn) => {
      console.log("Successful Spotfy Init", loggedIn)
      this.loggedIn_ = loggedIn;

      // Log In if not already
      if (!loggedIn) {
        console.log(SPOTIFY_REDIRECT_URL)
        const request = Spotify.login({
          showDialog: false,
          redirectURL: SPOTIFY_REDIRECT_URL,
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

  static isLoggedIn() {
    return this.loggedIn_;
  }

  static getTracksInternal_(playlist_id, resolve, reject, limit=100, offset=0, items=[]) {
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

  static getTracks(playlist_id) {
    const promise = new Promise((resolve, reject) => {
      this.getTracksInternal_(playlist_id, resolve, reject)
    });

    return promise;
  }

  static pause() {
    Spotify.setPlaying(false).then(() => {
        global.audioEvents.emit('pause', {})
        return true
    }).catch((e) => {
      console.log('Error Pausing Playback', e)
      return false
    })
  }

  static resume() {
    Spotify.setPlaying(true).then(() => {
        global.audioEvents.emit('play', {})
        return true;
    }).catch((e) => {
      console.log('Error Resuming Playback', e)
      return false;
    })
  }

  static playURI(spotifyURI, startIndex=0, startPosition=0, extraData={}) {
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

  static onTrackSelect(track) {
    if (track.playlist) {
      const uri = 'spotify:playlist:' + track.playlist;
      return this.playURI(uri, track.index, 0, track)
    }
    return this.playURI(track.track.uri, 0, 0, track)
  }

  static onNext() {
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

  static onPrev() {
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

  static onShuffle(shuffle=true) {
    const request = Spotify.setShuffling(shuffle)
    request.then((data) => {
      console.log("Shuffle", shuffle)
      global.audioEvents.emit('shuffle', {
        isShuffled: shuffle
      })
    }).catch((e) => {
      console.info('Failed To Shuffle Tracks', e)
    })
  }

  static onSeek(position=0) {
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
