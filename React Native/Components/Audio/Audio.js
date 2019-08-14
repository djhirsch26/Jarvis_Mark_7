import React from 'react'
import { View, Text, Button, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Toolbar } from 'react-native-material-ui';


import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import AudioEvents from './AudioEvents'
import SpotifyController from './SpotifyController'

import {
  updateTracks,
  setIsPlaying
} from '../../actions'


class Audio extends React.Component {
  state = {
    isPlaying: false,
  }

  constructor() {
    super();
    this.audioEvents = new AudioEvents();
  }

  componentDidMount() {
    /** Initialize Audio Event Behaviors */
    this.audioEvents.on('update_tracks', (tracks) => {
      console.log("Update Tracks", tracks)
      this.props.updateTracks(tracks)
    })

    this.audioEvents.on('play', () => {
      console.log('Something is playing')
      this.props.setIsPlaying(true);
    })

    this.audioEvents.on('pause', () => {
      console.log("something is pausing")
      this.props.setIsPlaying(false);
    })


    /**************/
    this.spotifyController = new SpotifyController(this.audioEvents);
    this.currentController = this.spotifyController;
    console.log(this.spotifyController)

  }

  onPressThing() {
    this.spotifyController.playURI('spotify:track:4hPpVbbakQNv8YTHYaOJP4')
    // this.spotifyController.getTracks('1TIzQuYM2bG6X6giwGaISF')
  }

  playPause() {
    if (this.props.isPlaying) {
      this.currentController.pause()
      this.props.setIsPlaying(false);
    } else {
      var resumed = this.currentController.resume()
      this.props.setIsPlaying(resumed);
    }
  }

  onTrackPress(item) {
    return () => {
      console.log("Pressed Item", item)
      this.currentController.onTrackSelect(item)
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
    // const AudioControls =
    return (
      <View style={styles.container}>
        <Toolbar
          centerElement="Spotify"
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
        </View>
        <View style={styles.tracks}>
          <Text> Tracks </Text>
          <FlatList
            data={this.props.tracks}
            renderItem={this.renderTrack.bind(this)}
            keyExtractor={(item) => (item.track.id)}
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
    isPlaying: state.audio.isPlaying,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateTracks,
    setIsPlaying
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Audio);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    flex: .05,
    paddingTop: 30,
    paddingBottom: 15,
    backgroundColor: '#2196F3',
  },
  toolbarTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  tracks: {
    flex: 1,
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
    fontSize: 12,
    flex: 8
  },
  listIcon: {
    textAlign: 'left',
    flex: 1,
  }
})