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
  SPOTIFY_INITAL_TRACK,
  REPEAT
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
    this.trackInfo_={}
    this.playerInfo_={}
    this.repeatDirty_=false

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
        if (this.trackInfo_.spotifyURI != data.metadata.currentTrack.uri) {
          this.playerInfo_['repeating'] = data.state.repeating ? REPEAT.CONTEXT : REPEAT.OFF
        }
        var {trackInfo, playerInfo} = this.extractSpotifyData_(data)
        global.audioEvents.emit('track_change', {trackInfo, playerInfo})
      }
    })

    Spotify.addListener('shuffleStatusChange', (data) => {
      if (data.metadata.currentTrack) {
        var {trackInfo, playerInfo} = this.extractSpotifyData_(data)
        global.audioEvents.emit('shuffle', {trackInfo, playerInfo})
      }
    })

    Spotify.addListener('play', (data) => {
      if (data.metadata.currentTrack) {
        var {trackInfo, playerInfo} = this.extractSpotifyData_(data)
        global.audioEvents.emit('play', {trackInfo, playerInfo})
      }
    })

    Spotify.addListener('trackDelivered', (data) => {
      if (data.metadata.currentTrack) {
        var {trackInfo, playerInfo} = this.extractSpotifyData_(data)
        console.log({trackInfo, playerInfo}, 100)
        // global.audioEvents.emit('play', {trackInfo, playerInfo})
      }
    })

    Spotify.addListener('pause', (data) => {
      if (data.metadata.currentTrack) {
        var {trackInfo, playerInfo} = this.extractSpotifyData_(data)
        global.audioEvents.emit('pause', {trackInfo, playerInfo})
      }
    })

    Spotify.addListener('repeatStatusChange', (data) => {
      if (data.metadata.currentTrack) {
        if(!this.repeatDirty_) {
          this.playerInfo_['repeating'] = data.state.repeating ? REPEAT.CONTEXT : REPEAT.OFF
        } else {
          this.repeatDirty_=false
        }
        var {trackInfo, playerInfo} = this.extractSpotifyData_(data)
        global.audioEvents.emit('repeat', {trackInfo, playerInfo})
      }
    })

  }

  static getTrackIndex_(uri) {
    return this.tracks_[uri]
  }

  static extractSpotifyData_(data) {
    const trackInfo = {
      ...this.trackInfo_,
      name: data.metadata.currentTrack.name,
      index: this.getTrackIndex_(data.metadata.currentTrack.uri),
      duration: data.metadata.currentTrack.duration,
      artist: data.metadata.currentTrack.artistName,
      album: data.metadata.currentTrack.albumName,
      image: data.metadata.currentTrack.albumCoverArtURL,
      spotifyURI: data.metadata.currentTrack.uri
    }
    const playerInfo = {
      ...this.playerInfo_,
      playing: data.state.playing,
      position: data.state.position,
      shuffling: data.state.shuffling,
    }

    this.trackInfo_ = trackInfo
    this.playerInfo_ = playerInfo
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
    if (track.playlist) {
      const uri = 'spotify:playlist:' + track.playlist;
      return this.playURI(uri, this.getTrackIndex_(track.track.uri), 0, track)
    }
    return this.playURI(track.track.uri, 0, 0, track)
  }

  static resume() {
    Spotify.setPlaying(true)
  }

  static playURI(spotifyURI, startIndex=0, startPosition=0, extraData={}) {
    Spotify.playURI(spotifyURI, startIndex, startPosition)
  }

  static onNext() {
    Spotify.skipToNext();
  }

  static onPrev() {
    Spotify.skipToPrevious()
  }

  static onShuffle(shuffle=true) {
    Spotify.setShuffling(shuffle).then(() => {
      this.repeatDirty_ = true
    })
  }

  static setRepeating(repeat="context") {
    Spotify.setRepeating(repeat).then(() => {
      this.playerInfo_['repeating'] = repeat
      this.repeatDirty_ = true
      global.audioEvents.emit('repeat', {
        playerInfo: {repeating: repeat}
      })
      return true
    }).catch((e) => {
      console.log('Error Pausing Playback', e)
      return false
    })
  }

  static seek(position=0) {
    const request = Spotify.seek(position)
    request.then(() => {
      this.playerInfo_['position'] = position
      global.audioEvents.emit('seek', {
        playerInfo: {position}
      })
    }).catch((e) => {
      console.info('Failed To Seek Track: ' + e)
    })
  }
}

export default SpotifyController;
