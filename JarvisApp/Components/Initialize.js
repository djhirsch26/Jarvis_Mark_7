import React from 'react'
import { View } from 'react-native'

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import AudioInit from './Audio/AudioInit'

class Initialize extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <View>
        <AudioInit/>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Initialize);
