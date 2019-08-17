import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';


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
      this.jarvis.store = store
      return this.jarvis
    }
    return this.makeJarvis(store)
  }

  static makeJarvis(store) {
    const Jarvis = {
      store,
      /********** EFFECTIVE API FOR JARVIS *************/
      SpotifyPlay(uri, offset = 0) {
        console.log('playing ' + uri + ' with offset ' + offset)
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
