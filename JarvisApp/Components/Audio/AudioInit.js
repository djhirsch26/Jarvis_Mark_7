import React from 'react'
import { View } from 'react-native'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import SpotifyController from './Controllers/SpotifyController'
import SoundcloudController from './Controllers/SoundcloudController'

import {
  updateTracks,
  setIsPlaying,
  updateTrackInfo,
  updatePlayerInfo,
  setShuffling,
  setRepeating
} from '../../actions'

import MusicControl from 'react-native-music-control';



class AudioInit extends React.Component {

  componentDidMount() {
    SpotifyController.init()
    SoundcloudController.init()

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
      console.log('Global Play')
      this.updateState(state)

      // Changes the state to paused
      MusicControl.updatePlayback({
        state: state.playerInfo.playing ? MusicControl.STATE_PLAYING : MusicControl.STATE_PAUSED,
        elapsedTime: Math.floor(state.playerInfo.position),
      })
    })

    global.audioEvents.on('pause', (state) => {
      console.log("Global Pause")

      this.updateState(state)
      // Changes the state to paused

      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
        elapsedTime: Math.floor(state.playerInfo.position),
      })
    })

    global.audioEvents.on('track_change', (state) => {
      console.log('Track Changed')
      MusicControl.setNowPlaying({
        title: state.trackInfo.name,
        artwork: state.trackInfo.image, // URL or RN's image require()
        artist: state.trackInfo.artist,
        album: state.trackInfo.album,
        duration: state.trackInfo.duration, // (Seconds)
      })

      this.updateState(state)
    })

    global.audioEvents.on('seek', (state) => {
      MusicControl.updatePlayback({elapsedTime: Math.floor(state.playerInfo.position)})
      this.props.updatePlayerInfo(state.playerInfo)
    })

    global.audioEvents.on('shuffle', ({trackInfo, playerInfo}) => {
      this.props.setShuffling(playerInfo.shuffling)

    })

    global.audioEvents.on('repeat', ({trackInfo, playerInfo}) => {
      this.props.setRepeating(playerInfo.repeating)
    })

    global.audioEvents.on('update_trackinfo', ({trackInfo}) => {
      this.props.updateTrackInfo(trackInfo)
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
    setRepeating,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioInit);
