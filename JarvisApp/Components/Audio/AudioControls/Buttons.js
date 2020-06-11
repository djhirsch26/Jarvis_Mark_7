import React from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native'

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {DEFAULT_BUTTON_COLOR, OFF_BUTTON_COLOR, REPEAT} from '../../../constants'

const DEFAULT_BUTTON_SIZE = 16
const ICON_SIZE=24

class Buttons extends React.Component {
  componentDidMount() {

  }

  render() {
    const play_button_size = 60

    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => global.audioEvents.emit('request_prev')}>
              <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 5, width: play_button_size, height: play_button_size, borderRadius: play_button_size, backgroundColor: 'transparent'}}>
                <Icon name={"backward"} size={ICON_SIZE} color={DEFAULT_BUTTON_COLOR} style={styles.flex}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => global.audioEvents.emit(this.props.isPlaying ? 'request_pause' : 'request_play')}>
              <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: (this.props.isPlaying ? 0 : 5), width: play_button_size, height: play_button_size, borderRadius: play_button_size, backgroundColor: DEFAULT_BUTTON_COLOR}}>
                <Icon name={this.props.isPlaying ? 'pause' : 'play'} size={ICON_SIZE} color={'#EEEEEE'} style={styles.flex}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => global.audioEvents.emit('request_next')}>
              <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 5, width: play_button_size, height: play_button_size, borderRadius: play_button_size, backgroundColor: 'transparent'}}>
                <Icon name={"forward"} size={ICON_SIZE} color={DEFAULT_BUTTON_COLOR} style={styles.flex}/>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => global.audioEvents.emit('request_shuffle')} disabled={!this.props.canShuffle}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Icon name={"random"} size={ICON_SIZE} color={this.props.isShuffled ? DEFAULT_BUTTON_COLOR : OFF_BUTTON_COLOR} style={styles.flex}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => global.audioEvents.emit('request_repeat')}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      {this.props.repeatMode == REPEAT.TRACK ?
                        <MaterialIcon name={"repeat-one"} size={ICON_SIZE} color={DEFAULT_BUTTON_COLOR} style={styles.flex}/>  :
                        <MaterialIcon name={"repeat"} size={ICON_SIZE} color={this.props.repeatMode==REPEAT.CONTEXT ? DEFAULT_BUTTON_COLOR : OFF_BUTTON_COLOR} style={styles.flex}/>
                      }
                    </View>
                  </TouchableOpacity>
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
    canShuffle: state.audio.playerInfo.canShuffle,
    repeatMode: state.audio.playerInfo.repeating,
    trackInfo: state.audio.trackInfo,
    playerInfo: state.audio.playerInfo,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
