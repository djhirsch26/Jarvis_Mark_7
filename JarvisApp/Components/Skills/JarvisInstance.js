import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import SpotifyController from '../Audio/Controllers/SpotifyController'

class JarvisInstance extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <View></View>
    )
  }

  static getInstance(store) {
    if (this.jarvis) {
      this.jarvis.store_ = store
      return this.jarvis
    }
    return this.makeJarvis(store)
  }

  static makeJarvis(store) {
    const Jarvis = {
      store_: store,
      /********** EFFECTIVE API FOR JARVIS *************/
      SpotifyPlay(uri, offset = 0, startTime=0) {
        console.log('playing ' + uri + ' with offset ' + offset)
        SpotifyController.playURI(uri, offset, startTime)
      },

      SpotifyTracks(playlistURI) {
        return SpotifyController.getTracks(playlistURI)
      },

      SpotifyPause() {
        console.log("Spotify Pause")
      },

      SpotifyNext() {
        console.log("Spotify Next")
      },

      SpotifyPrev() {
        console.log("Spotify Prev")
      },

      SpotifyShuffle() {
        console.log("Spotify Shuffle")
        SpotifyController.onShuffle(true)
      }
    }


    this.jarvis = Jarvis;
    return Jarvis
  }



}










function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JarvisInstance);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
