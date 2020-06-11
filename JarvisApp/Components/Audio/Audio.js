import React from 'react'
import { View, Text, Button, Image, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Toolbar } from 'react-native-material-ui';

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import AudioEvents from './AudioEvents'
import SpotifyController from './Controllers/SpotifyController'
import NoOpController from './Controllers/NoOpController'
import SoundcloudController from './Controllers/SoundcloudController'

import MusicControl from 'react-native-music-control';

import TrackInfo from './TrackInfo'
import {getPlayerPosition} from './util'

import {
  updateTracks,
  setIsPlaying,
  updateTrackInfo,
  updatePlayerInfo,
  seekTrack,
} from '../../actions'

import Video from 'react-native-video';


import {
  DEFAULT_BUTTON_COLOR as DEFAULT_BUTTON_COLOR_,
  REPEAT,
} from '../../constants'

const TRACK_SELECTED_COLOR = '#F4DCFF'
const DEFAULT_BUTTON_COLOR = DEFAULT_BUTTON_COLOR_
const RESTART_PERCENT = 0.02

class Audio extends React.Component {

  constructor() {
    super();
    this.state = {
      isFetching: false,
     }
     this.currentController = SoundcloudController
     // this.currentController = SpotifyController
  }

  componentDidMount() {
    // this.currentController = SoundcloudController

    this.props.updatePlayerInfo(this.currentController.enable())

    global.audioEvents.on('request_play', () => {this.play()})
    global.audioEvents.on('request_pause', () => this.pause())
    global.audioEvents.on('request_next', () => this.onNext())
    global.audioEvents.on('request_prev', () => this.onPrev())
    global.audioEvents.on('request_shuffle', () => this.onShuffle())
    global.audioEvents.on('request_seek', (x) => {this.seek(parseFloat(x))})
    global.audioEvents.on('request_repeat', () => this.onRepeat())

    MusicControl.on('play', () => {global.audioEvents.emit('request_play')})
    MusicControl.on('pause', () => {global.audioEvents.emit('request_pause')})
    MusicControl.on('stop', () => {console.log("Stop Remote")})
    MusicControl.on('nextTrack', () => {global.audioEvents.emit('request_next')})
    MusicControl.on('previousTrack', () => {global.audioEvents.emit('request_prev')})
    MusicControl.on('seekForward', (x) => {console.log(x)})
    MusicControl.on('seekBackward', (x) => {console.log(x)})
    MusicControl.on('skipForward', (x) => {console.log(x)})
    MusicControl.on('skipBackward', (x) => {console.log(x)})
    MusicControl.on('changePlaybackPosition', (x) => {global.audioEvents.emit('request_seek', x)})

    // Android Specific Options
MusicControl.enableControl('setRating', true)
MusicControl.enableControl('volume', true) // Only affected when remoteVolume is enabled
MusicControl.enableControl('remoteVolume', true)

    /**************/
    // this.spotifyController = new SpotifyController(this.audioEvents);
    // this.currentController = this.spotifyController;
    this.currentController.enable();

  }

  componentWillUnmount() {
    global.audioEvents.removeAllListeners(['request_play',
    'request_pause',
    'request_prev',
    'request_next',
    'request_shuffle',
    'request_seek',
    'request_repeat'])
    this.currentController.disable()
  }

  onPressThing() {
    this.spotifyController.playURI('spotify:track:4hPpVbbakQNv8YTHYaOJP4')
    // this.spotifyController.getTracks('1TIzQuYM2bG6X6giwGaISF')
  }

  play() {
    console.log("HELP", this.currentController)
    this.currentController.resume()
  }

  pause() {
    this.currentController.pause()
  }

  onNext() {
    this.currentController.onNext()
  }

  onPrev() {
    const poseInformation = getPlayerPosition(this.props.playerInfo, this.props.trackInfo)
    if (poseInformation.percent < RESTART_PERCENT) {
      this.currentController.onPrev()
    } else {
      this.currentController.seek(0)
    }
  }

  onShuffle() {
    this.currentController.onShuffle(!this.props.isShuffled)
  }

  seek(pos) {
    this.currentController.seek(pos)
  }

  onRepeat() {
    switch(this.props.repeatMode) {
      case REPEAT.OFF:
        this.currentController.setRepeating(REPEAT.CONTEXT)
        break;
      case REPEAT.CONTEXT:
        this.currentController.setRepeating(REPEAT.TRACK)
        break;
      case REPEAT.TRACK:
        this.currentController.setRepeating(REPEAT.OFF)
        break;
    }
  }

  doRefresh() {
    this.currentController.refresh().then((e) => {
      this.setState({ isFetching: false })
    })
  }

  onRefresh() {
     this.setState({ isFetching: true }, function() { this.doRefresh() });
  }

  onTrackPress(track) {
    return () => {
      if (track) {
        this.currentController.playTrack(track)
      }
      // this.currentController.onTrackSelect(item)
    }
  }

  onRandomPress() {
    this.onTrackPress(this.props.tracks[Math.floor(Math.random() * this.props.tracks.length)])()
  }

  renderTrack({item, index}) {
    const name = item.name;
    const icon = 'music'
    var backgroundColor = (this.props.trackInfo && index == this.props.trackInfo.index) ? TRACK_SELECTED_COLOR : undefined
    return (
      <TouchableOpacity
       onPress={this.onTrackPress(item).bind(this)}
       >
      <View style={{...styles.listView, backgroundColor: backgroundColor}}>
          <Icon name={icon} size={24} color='gray' style={styles.listIcon}/>
          <Text style={styles.listName}>
            {name}
          </Text>
      </View>
      </TouchableOpacity>

    )
  }



  renderCurrentTrack() {
    if (!this.props.trackInfo) {
      return <View style={{flex: 0}}/>
    }

    // const currentTrack = <View style={styles.controls}>
    //   <TrackInfo
    //   trackInfo={this.props.trackInfo}
    //   onPrev={this.onPrev.bind(this)}
    //   onNext={this.onNext.bind(this)}
    //   onPlay={this.play.bind(this)}
    //   onPause={this.pause.bind(this)}
    //   onShuffle={this.onShuffle.bind(this)}
    //   isPlaying={this.props.isPlaying}
    //   isShuffled={this.props.isShuffled}
    //   />
    // </View>

    const currentTrack = <View/>

    return currentTrack
  }



  render() {

    const centerElement =
    <View style={styles.flex}>
        <Text style={styles.toolbarTitle}>
        Spotify
        </Text>
      </View>

    // const AudioControls =
    return (
      <View style={styles.container}>
        <Toolbar
          centerElement={centerElement}
          style={{
            container: styles.toolbar,
            titleText: styles.toolbarTitle
          }}
        />
        <View style={styles.container}>
          {this.currentController.render()}

          <TouchableOpacity onPress={this.onRandomPress.bind(this)} style={{alignItems: 'center', justifyContent: 'center', fontSize: 16, paddingTop: 8, paddingBottom: 8, backgroundColor: '#e3edfc'}}>
            <Text style={{fontWeight: "bold"}}> Shuffle Play </Text>
          </TouchableOpacity>

          <View style={styles.tracks}>
            <FlatList
              data={this.props.tracks}
              renderItem={this.renderTrack.bind(this)}
              keyExtractor={(item) => {
                return item.id;
              }}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
            />
            </View>
            {this.renderCurrentTrack()}
        </View>
      </View>
    )
  }
}
// <View styles={styles.tracks}>
// </View>


function mapStateToProps(state) {
  return {
    tracks: state.audio.tracks,
    isPlaying: state.audio.playerInfo.playing,
    isShuffled: state.audio.playerInfo.shuffling,
    repeatMode: state.audio.playerInfo.repeating,
    trackInfo: state.audio.trackInfo,
    playerInfo: state.audio.playerInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateTracks,
    setIsPlaying,
    updateTrackInfo,
    updatePlayerInfo,
    seekTrack,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Audio);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    flex: 0.05,
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#2196F3',
  },
  toolbarTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  controls: {
    flex: 0.15
  },
  tracks: {
    flex: 1,
    borderTopColor: 'gray',
    borderTopWidth: 1,
    paddingBottom: 50,
  },
  iconButton: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  listView: {
    flex: 1,
    width: '100%',
    padding: 15,
    paddingRight: 10,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
  },
  listName: {
    fontSize: 16,
    flex: 8
  },
  listIcon: {
    textAlign: 'left',
    flex: 1,
  }
})
