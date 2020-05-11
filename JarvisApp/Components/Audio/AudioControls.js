import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, Dimensions, TouchableOpacity, StatusBar} from 'react-native'

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import TextTicker from 'react-native-text-ticker'

import Icon from 'react-native-vector-icons/FontAwesome';

import {DEFAULT_BUTTON_COLOR, OFF_BUTTON_COLOR} from '../../constants'
import {getPlayerPosition} from '../../selectors'

import AudioProgressBar from './AudioControls/AudioProgressBar'
import Buttons from './AudioControls/Buttons'

const DEFAULT_BUTTON_SIZE = 16
const ICON_SIZE=24


class AudioControls extends React.Component {

  constructor() {
    super()
    const screenWidth = Dimensions.get('window').width

    this.state={
      screenWidth,
    }
  }

  // <View style={{flex: 0}}>
  //   <Text>Fill in with this.props.context</Text>
  // </View>

  render() {
    const {trackInfo} = this.props
    const imageWidth = this.state.screenWidth - 600

    // <View style={{position: 'absolute', marginLeft: '6.5%'}}>

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={{paddingTop: 20, flex: 1, width: this.state.screenWidth}}>
          <View style={{flex: 1, paddingTop: 10, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly'}}>
            <View style={{flex: 1, paddingLeft: 30}}>
              <TouchableOpacity onPress={this.props.hide}>
                <Icon name="chevron-down" size={DEFAULT_BUTTON_SIZE} color={DEFAULT_BUTTON_COLOR}/>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, alignItems: 'center'}}/>

            <View style={{flex: 1, paddingRight: 30, alignItems: 'flex-end'}}>
              <TouchableOpacity>
                <Icon name="ellipsis-h" size={DEFAULT_BUTTON_SIZE} color={DEFAULT_BUTTON_COLOR}/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 6}}>
            <Image resizeMode="contain" source={{uri: trackInfo.image}} style={{position: 'absolute', marginLeft: 60, marginRight: 60, top: 0, left: 0, bottom: 20, right: 0}} />
          </View>

          <View style={{flex: 2, justifyContent: 'flex-start', paddingLeft: 20, paddingRight: 20}}>
            <View style={{flex: 1, paddingBottom: 2, justifyContent: 'flex-end', alignItems: 'flex-start' }}>
              <TextTicker duration={8000} loop>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{trackInfo.name}</Text>
              </TextTicker>
            </View>
            <View style={{flex: 1,justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <TextTicker duration={8000} loop>
                <Text style={{fontSize: 16}}>{trackInfo.artist}</Text>
              </TextTicker>
            </View>
          </View>

          <View style={{flex: 5, paddingBottom: 20}}>
            <View style={{flex: 1}}>
              <AudioProgressBar/>
            </View>
            <View style={{flex: 4}}>
              <Buttons/>
            </View>
          </View>

        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    isPlaying: state.audio.playerInfo.playing,
    isShuffled: state.audio.playerInfo.shuffling,
    repeatMode: state.audio.playerInfo.repeating,
    trackInfo: state.audio.trackInfo,
    playerInfo: state.audio.playerInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioControls);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  }
})
