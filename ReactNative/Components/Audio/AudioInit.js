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
