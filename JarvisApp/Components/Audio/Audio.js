import React from 'react'
import { View, Text, Button, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Toolbar } from 'react-native-material-ui';

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import AudioEvents from './AudioEvents'
import SpotifyController from './SpotifyController'

import MusicControl from 'react-native-music-control';

import {
  updateTracks,
  setIsPlaying,
  updateTrackInfo,
  updatePlayerInfo
} from '../../actions'


class Audio extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    this.currentController = SpotifyController

    MusicControl.on('play', () => {this.play()})
    MusicControl.on('pause', () => {this.pause()})
    MusicControl.on('stop', () => {console.log("Stop Remote")})
    MusicControl.on('nextTrack', () => {this.onNext()})
    MusicControl.on('previousTrack', () => {this.onPrev()})
    MusicControl.on('seekForward', (x) => {console.log(x)})
    MusicControl.on('seekBackward', (x) => {console.log(x)})
    MusicControl.on('skipForward', (x) => {console.log(x)})
    MusicControl.on('skipBackward', (x) => {console.log(x)})
    MusicControl.on('changePlaybackPosition', (x) => {this.seek(parseFloat(x))})

    /**************/
    // this.spotifyController = new SpotifyController(this.audioEvents);
    // this.currentController = this.spotifyController;

  }

  onPressThing() {
    this.spotifyController.playURI('spotify:track:4hPpVbbakQNv8YTHYaOJP4')
    // this.spotifyController.getTracks('1TIzQuYM2bG6X6giwGaISF')
  }

  playPause() {
    if (this.props.isPlaying) {
      this.currentController.pause()
    } else {
      var resumed = this.currentController.resume()
    }
  }

  play() {
    this.currentController.resume()
  }

  pause() {
    this.currentController.pause()
  }

  onNext() {
    this.currentController.onNext()
  }

  onPrev() {
    this.currentController.onPrev()
  }

  onShuffle() {
    this.currentController.onShuffle(!this.props.isShuffled)
  }

  seek(pos) {
    const request = this.currentController.seek(pos)
    request.then((pos) => {
      console.log(pos)
      MusicControl.updatePlayback({elapsedTime: Math.floor(pos)})
    }).catch((e) => {
        console.log(e)
    })
  }

  onTrackPress(track) {
    return () => {
      this.currentController.playTrack(track)
      // this.currentController.onTrackSelect(item)
    }
  }

  renderTrack({item, index}) {
    const name = item.track.name;
    const icon = 'music'
    return (
      <TouchableOpacity
       onPress={this.onTrackPress(item).bind(this)}
       >
      <View style={styles.listView}>
          <Icon name={icon} size={24} color='gray' style={styles.listIcon}/>
          <Text style={styles.listName}>
            {name}
          </Text>
      </View>
      </TouchableOpacity>

    )
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
        <View style={styles.top}>
          <Button
            onPress={this.playPause.bind(this)}
            title="Play/Pause"
            color="#841584"
          />
          <Button
            onPress={this.onNext.bind(this)}
            title="Next"
            color="#841584"
          />
          <Button
            onPress={this.onPrev.bind(this)}
            title="Prev"
            color="#841584"
          />
          <Button
            onPress={this.onShuffle.bind(this)}
            title="Shuffle"
            color="#841584"
          />
        </View>
        <View style={styles.tracks}>
          <View style={styles.trackTitleWrapper}>
            <Text style={styles.tracksTitle}> Tracks </Text>
          </View>
          <FlatList
            data={this.props.tracks}
            renderItem={this.renderTrack.bind(this)}
            keyExtractor={(item) => {
              return item.track.id;
            }}
          />
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateTracks,
    setIsPlaying,
    updateTrackInfo,
    updatePlayerInfo,
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
  top: {
    flex: 0.3
  },
  tracks: {
    flex: 0.7,
  },
  trackTitleWrapper: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 5
  },
  tracksTitle: {
    fontSize: 18,
    alignItems: 'center',
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
