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
      console.log('Something is playing', state)

      // Changes the state to paused
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING,
        elapsedTime: Math.floor(state.playerInfo.position),
      })

      this.props.setIsPlaying(true);
    })

    global.audioEvents.on('pause', (state) => {
      console.log("something is pausing", state)
      // Changes the state to paused
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
        elapsedTime: Math.floor(state.playerInfo.position),
      })

      this.props.setIsPlaying(false);
    })

    global.audioEvents.on('track_change', (trackInfo, playerInfo) => {
      console.log('Track Changed', trackInfo)
      MusicControl.setNowPlaying({
        title: trackInfo.name,
        artwork: trackInfo.image, // URL or RN's image require()
        artist: trackInfo.artist,
        album: trackInfo.album,
        duration: trackInfo.duration, // (Seconds)
      })
      this.props.updateTrackInfo(trackInfo)
      this.props.updatePlayerInfo(playerInfo)
    })

    global.audioEvents.on('shuffle', (data) => {
      this.props.setShuffling(data.isShuffled)

    })
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
