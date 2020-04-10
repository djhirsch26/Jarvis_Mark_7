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
  SPOTIFY_INITAL_TRACK
} from '../../constants'

import {shuffle} from '../../utils'

class SpotifyController {

  loggedIn_ = false;

  static init() {
    var request = Spotify.initialize({
        clientID: CLIENT_ID,
        redirectURL: SPOTIFY_REDIRECT_URL,
        scopes: SCOPES,
        tokenRefreshURL: SPOTIFY_TOKEN_REFRESH,
        tokenSwapURL: SPOTIFY_TOKEN_SWAP,
    })

    this.tracks_={}
    this.tracksOriginal_={}

    request.then((loggedIn) => {
      this.loggedIn_ = loggedIn;

      // Log In if not already
      if (!loggedIn) {
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
      const playlist = SPOTIFY_INITAL_TRACK
      const request = this.getTracks(playlist)
      request.then((tracks) => {
        tracks = tracks.map(track => {
          track.playlist = playlist
          return track;
        })
        // tracks.forEach((track, index) => {
        //   this.tracksOriginal_[track.track.uri] = index
        // })
        // shuffle(tracks)
        tracks.forEach((track, index) => {
          this.tracks_[track.track.uri] = index
        })
        global.audioEvents.emit('update_tracks', tracks)
      }).catch((e) => {
        console.log('error', e)
      })
    })

    Spotify.addListener('trackChange', (data) => {
      if (data.metadata.currentTrack) {
        var {trackInfo, playerInfo} = this.extractSpotifyData_(data)
        global.audioEvents.emit('track_change', {trackInfo, playerInfo})
      }
    })

    Spotify.addListener('play', (data) => {
      if (data.metadata.currentTrack) {
        var {trackInfo, playerInfo} = this.extractSpotifyData_(data)
        global.audioEvents.emit('play', {trackInfo, playerInfo})
      }
    })

    Spotify.addListener('pause', (data) => {
      if (data.metadata.currentTrack) {
        var {trackInfo, playerInfo} = this.extractSpotifyData_(data)
        global.audioEvents.emit('pause', {trackInfo, playerInfo})
      }
    })

  }

  static getTrackIndex_(uri) {
    return this.tracks_[uri]
  }

  static extractSpotifyData_(data) {
    const trackInfo = {
      name: data.metadata.currentTrack.name,
      index: this.getTrackIndex_(data.metadata.currentTrack.uri),
      duration: data.metadata.currentTrack.duration,
      artist: data.metadata.currentTrack.artistName,
      album: data.metadata.currentTrack.albumName,
      image: data.metadata.currentTrack.albumCoverArtURL,
    }
    const playerInfo = {
      playing: data.state.playing,
      position: data.state.position,
      repeating: data.state.repeating,
      shuffling: data.state.shuffling,
    }

    return {trackInfo, playerInfo}
  }

  static isLoggedIn() {
    return this.loggedIn_;
  }

  static getTracksInternal_(playlist_id, resolve, reject, limit=100, offset=0, items=[]) {
    const request = Spotify.sendRequest('v1/playlists/' + playlist_id + '/tracks', 'GET', {limit, offset}, false)
    const callback = (tracks) => {
      items = items.concat(tracks.items)
      if (tracks.offset + tracks.limit < tracks.total) {
        this.getTracksInternal_(playlist_id, resolve, reject, limit, tracks.offset + limit, items)
      } else {
        resolve(items)
      }
    }
    request.then(callback.bind(this)).catch((e) => {
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
        return true
    }).catch((e) => {
      console.log('Error Pausing Playback', e)
      return false
    })
  }

  static playTrack(track) {
    console.log("Call To Spotify Play Track", track)
    if (track.playlist) {
      const uri = 'spotify:playlist:' + track.playlist;
      return this.playURI(uri, this.getTrackIndex_(track.track.uri), 0, track)
    }
    return this.playURI(track.track.uri, 0, 0, track)
  }

  static resume() {
    console.log("Call To Spotify Resume Track")
    Spotify.setPlaying(true).then(() => {
        return true;
    }).catch((e) => {
      console.log('Error Resuming Playback', e)
      return false;
    })
  }

  static playURI(spotifyURI, startIndex=0, startPosition=0, extraData={}) {
    console.log("Call to Spotify Play URI")
    const request = Spotify.playURI(spotifyURI, startIndex, startPosition)
    request.then((success) => {
      return true;
    }).catch((e) => {
      console.log("Failed To Start Spotify Track", e)
    })
  }

  // static onTrackSelect(track) {
  //   if (track.playlist) {
  //     const uri = 'spotify:playlist:' + track.playlist;
  //     return this.playURI(uri, track.index, 0, track)
  //   }
  //   return this.playURI(track.track.uri, 0, 0, track)
  // }

  static onNext() {
    const request = Spotify.skipToNext();
    request.then((data) => {
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
      global.audioEvents.emit('shuffle', {
        isShuffled: shuffle
      })
    }).catch((e) => {
      console.info('Failed To Shuffle Tracks', e)
    })
  }

  static seek(position=0) {
    const request_ = new Promise((resolve, reject) => {
      const request = Spotify.seek(position)
      request.then(() => {
        resolve(position)
      }).catch((e) => {
        reject('Failed To Seek Track: ' + e)
      })
    })
    return request_
  }
}

export default SpotifyController;
