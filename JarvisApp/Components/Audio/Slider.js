import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import TrackInfo from './TrackInfo'

class AudioSlider extends React.Component {

  renderCurrentTrack() {
    if (!this.props.trackInfo) {
      return <View/>
    }

    const currentTrack = (<TrackInfo
      trackInfo={this.props.trackInfo}
      onPrev={() => global.audioEvents.emit('request_prev')}
      onNext={() => global.audioEvents.emit('request_next')}
      onPlay={() => global.audioEvents.emit('request_play')}
      onPause={() => global.audioEvents.emit('request_pause')}
      onShuffle={() => global.audioEvents.emit('request_shuffle')}
      isPlaying={this.props.isPlaying}
      isShuffled={this.props.isShuffled}
    />)


    return currentTrack
  }

  // {this.renderCurrentTrack()}

  render() {
    return (
      <View style={styles.container}>
        {this.renderCurrentTrack()}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    isPlaying: state.audio.playerInfo.playing,
    isShuffled: state.audio.playerInfo.shuffling,
    trackInfo: state.audio.trackInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioSlider);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})
