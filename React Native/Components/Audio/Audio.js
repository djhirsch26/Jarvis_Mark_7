import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import SpotifyController from './SpotifyController'


class Audio extends React.Component {

  constructor() {
    super();
    this.spotifyController = new SpotifyController();
  }

  componentDidMount() {
    console.log(this.spotifyController)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World</Text>
      </View>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Audio);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
