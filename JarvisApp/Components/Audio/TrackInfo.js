import React from 'react'
import { View, Text, Button, Image, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Toolbar } from 'react-native-material-ui';

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import AudioEvents from './AudioEvents'
import SpotifyController from './SpotifyController'

import TextTicker from 'react-native-text-ticker'
import MusicControl from 'react-native-music-control';

import {
  DEFAULT_BUTTON_COLOR as DEFAULT_BUTTON_COLOR_
} from '../../constants'

const TRACK_SELECTED_COLOR = '#F4DCFF'
const DEFAULT_BUTTON_COLOR = DEFAULT_BUTTON_COLOR_
const ICON_SIZE=18

class TrackInfo extends React.Component {

  constructor(props) {
    super()
  }

  makeButton_(icon, onPress, color=DEFAULT_BUTTON_COLOR) {
    var button = <TouchableOpacity onPress={onPress}>
      <View style={styles.iconButton}>
          <Icon name={icon} size={ICON_SIZE} color={color} style={styles.flex}/>
      </View>
    </TouchableOpacity>

    return button
  }

  render() {
    const {trackInfo} = this.props

    return (
      <View style={styles.currentTrackBox}>
        <View style={styles.currentTrackImageBox}>
          <Image source={{uri: trackInfo.image}} style = {{ width: 30, height: 30, resizeMode: 'center'}}/>
        </View>
        <View style={styles.currentTrackButtonsBox}>
          <View style={styles.ticker}>
            <TextTicker duration={10000} loop>
                <Text><Text style={{fontWeight: "bold"}}>{trackInfo.name}</Text> - {trackInfo.artist}</Text>
            </TextTicker>
          </View>
          <View style={styles.buttons}>
            {this.makeButton_('backward', this.props.onPrev)}
            {this.makeButton_(this.props.isPlaying ? 'pause' : 'play', this.props.isPlaying ? this.props.onPause : this.props.onPlay)}
            {this.makeButton_('forward', this.props.onNext)}
          </View>
        </View>
      </View>
  )

  }
}



export default TrackInfo;

const styles = StyleSheet.create({
  currentTrackBox: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'gray',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  currentTrackImageBox: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 15,
  },
  currentTrackButtonsBox: {
    flex: 6,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttons: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  iconButton: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  ticker: {
    flex: 2,
    justifyContent: 'center'
  }
})
