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

  componentDidMount() {
    SpotifyController.init()

    MusicControl.enableBackgroundMode(true);
    MusicControl.handleAudioInterruptions(true);

    MusicControl.enableControl('play', true)
    MusicControl.enableControl('pause', true)
    MusicControl.enableControl('stop', false)
    MusicControl.enableControl('nextTrack', true)
    MusicControl.enableControl('previousTrack', true)

    // Changing track position on lockscreen
    MusicControl.enableControl('changePlaybackPosition', true)

    MusicControl.enableControl('seekForward', false)
    MusicControl.enableControl('seekBackward', false)
    MusicControl.enableControl('skipForward', false)
    MusicControl.enableControl('skipBackward', false)

    console.log('initialize Audio Events')
    /** Initialize Audio Event Behaviors */
    global.audioEvents.on('update_tracks', (tracks) => {
      this.props.updateTracks(tracks.map((track, index) => {
        track.index = index
        return track;
      }))
    })

    global.audioEvents.on('play', (state) => {
      console.log('Global Play', state.trackInfo, state.playerInfo)
      this.updateState(state)

      // Changes the state to paused
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING,
        elapsedTime: Math.floor(state.playerInfo.position),
      })
    })

    global.audioEvents.on('pause', (state) => {
      console.log("Global Pause", state.trackInfo, state.playerInfo)
      
      this.updateState(state)
      // Changes the state to paused

      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
        elapsedTime: Math.floor(state.playerInfo.position),
      })
    })

    global.audioEvents.on('track_change', (state) => {
      console.log('Track Changed', state.trackInfo, state.playerInfo)
      MusicControl.setNowPlaying({
        title: state.trackInfo.name,
        artwork: state.trackInfo.image, // URL or RN's image require()
        artist: state.trackInfo.artist,
        album: state.trackInfo.album,
        duration: state.trackInfo.duration, // (Seconds)
      })

      this.updateState(state)
    })

    global.audioEvents.on('shuffle', (data) => {
      this.props.setShuffling(data.isShuffled)

    })
  }

  updateState(state) {
    this.props.updateTrackInfo(state.trackInfo)
    this.props.updatePlayerInfo(state.playerInfo)
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
