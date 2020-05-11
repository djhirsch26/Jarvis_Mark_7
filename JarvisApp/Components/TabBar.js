import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'

import {BottomTabBar} from '@react-navigation/bottom-tabs';

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import Slider from './Home/Slider';


class TabBar extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <View style={{flex: 0, bottom: 0}}>
      <Slider>
        <BottomTabBar {...this.props}/>
      </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
