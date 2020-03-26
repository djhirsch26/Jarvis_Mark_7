import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';


class Loading extends React.Component {
  componentDidMount() {

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

export default connect(mapStateToProps, mapDispatchToProps)(Loading);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
