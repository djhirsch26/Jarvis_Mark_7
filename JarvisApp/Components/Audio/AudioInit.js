import React from 'react'
import { View } from 'react-native'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import SpotifyController from './SpotifyController'

import {
  updateTracks,
  setIsPlaying,
  updateTrackInfo,
  updatePlayerInfo,
  setShuffling
} from '../../actions'

import MusicControl from 'react-native-music-control';



class AudioInit extends React.Component {

  constructor() {
    super();

    console.log('initialize Audio Events')
    /** Initialize Audio Event Behaviors */
    global.audioEvents.on('update_tracks', (tracks) => {
      this.props.updateTracks(tracks.map((track, index) => {
        track.index = index
        return track;
      }))
    })

    global.audioEvents.on('play', () => {
      console.log('Something is playing')

      // Basic Controls
      MusicControl.enableControl('play', true)
      MusicControl.enableControl('pause', true)
      MusicControl.enableControl('stop', false)
      MusicControl.enableControl('nextTrack', true)
      MusicControl.enableControl('previousTrack', true)

      MusicControl.setNowPlaying({
        title: 'Billie Jean',
        artwork: 'https://i.imgur.com/e1cpwdo.png', // URL or RN's image require()
        artist: 'Michael Jackson',
        album: 'Thriller',
        genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
        duration: 294, // (Seconds)
      })

      // Changes the state to paused
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING,
        elapsedTime: 0
      })

      this.props.setIsPlaying(true);
    })

    global.audioEvents.on('pause', () => {
      console.log("something is pausing")
      this.props.setIsPlaying(false);
    })

    global.audioEvents.on('track_change', (trackInfo, playerInfo) => {
      console.log('Track Changed', trackInfo)
      this.props.updateTrackInfo(trackInfo)
      this.props.updatePlayerInfo(playerInfo)
    })

    global.audioEvents.on('shuffle', (data) => {
      this.props.setShuffling(data.isShuffled)

    })


  }

  componentDidMount() {
    SpotifyController.init()

    MusicControl.enableBackgroundMode(true);


    MusicControl.enableControl('play', true)
    MusicControl.enableControl('pause', true)
    MusicControl.enableControl('stop', false)
    MusicControl.enableControl('nextTrack', true)
    MusicControl.enableControl('previousTrack', true)

    MusicControl.on('play', () => {console.log("play remote")})
    MusicControl.on('pause', () => {console.log("pause remote")})
    MusicControl.on('stop', () => {console.log("Stop Remote")})
    MusicControl.on('nextTrack', () => {console.log("Next Remote")})
    MusicControl.on('previousTrack', () => {console.log("Prev Remote")})
    console.log("Set Up Music Control")
  }

  render() {
    return (<View></View>)
  }
}


function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateTracks,
    setIsPlaying,
    updateTrackInfo,
    updatePlayerInfo,
    setShuffling,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioInit);
