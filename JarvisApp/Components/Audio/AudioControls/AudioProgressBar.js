import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {setSliderEnabled} from '../../../actions'
import {getPlayerPosition} from '../util'


import SlidingBar from './SlidingBar'

const SONG_BAR_PERCENT = 0.87
const BAR_HEIGHT = 5
const CURSOR_UP_COLOR = '#B86CEF'
const CURSOR_DOWN_COLOR = '#B86CEF'
const BACKGROUND_BAR_COLOR = '#BBBBBB'
const PLAYED_BAR_COLOR = '#B86CEF'


class AudioProgressBar extends React.Component {

  constructor() {
    super()
    const screenWidth = Dimensions.get('window').width

    this.state = {
      dragPressed: false,
      playedPercent: 0,
      dragPercent: 0,
      currentTime: new Date().getTime(),
    }
  }

  timerCallback() {
    if (this.props.playerInfo.playing) {
      this.forceUpdate()
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.timerCallback.bind(this), 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onSeekPress() {
    this.setState({dragPressed: true, dragPercent: this.state.playedPercent})
    this.props.setSliderEnabled(false)
  }

  onSeekDrag({dragPercent}) {
    this.setState({dragPercent})
  }

  formatTime(time) {
    time = Math.round(time)
    const minutes = Math.floor(time/60)
    const seconds = time%60
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
  }

  onSeekRelease({dragPercent}) {
    global.audioEvents.emit('request_seek', dragPercent*this.props.trackInfo.duration)
    this.setState({dragPressed: false, dragPercent, playedPercent: dragPercent})
    this.props.setSliderEnabled(true)
  }

  static getDerivedStateFromProps(props, state) {
    var song_location = getPlayerPosition(props.playerInfo, props.trackInfo)
    return state.dragPressed ? {song_location: song_location.location} : {song_location: song_location.location, playedPercent: song_location.percent}
  }

  render() {
    const {trackInfo} = this.props

    const circle_size = this.state.dragPressed ? 16 : 10
    const song_location = this.state.dragPressed ? this.state.dragPercent*trackInfo.duration : this.state.song_location
    const song_location_formatted = this.formatTime(song_location)
    const song_duration_formatted = this.formatTime(trackInfo.duration)
    const cursor_color = this.state.dragPressed ? CURSOR_UP_COLOR : CURSOR_DOWN_COLOR

    return (
      <View style={{flex: 1, paddingLeft: 30, paddingRight: 30}}>
        <SlidingBar
        height={BAR_HEIGHT}
        backgroundColor={BACKGROUND_BAR_COLOR}
        progressColor={PLAYED_BAR_COLOR}
        cursorSize={circle_size}
        cursor_color={cursor_color}
        progress={this.state.playedPercent}
        leftText={song_location_formatted}
        rightText={song_duration_formatted}
        onDrag={this.onSeekDrag.bind(this)}
        onPress={this.onSeekPress.bind(this)}
        onRelease={this.onSeekRelease.bind(this)}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    trackInfo: state.audio.trackInfo,
    playerInfo: state.audio.playerInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSliderEnabled,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioProgressBar);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
