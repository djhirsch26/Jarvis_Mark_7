import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {setUserData, setUserToken} from '../../actions'

class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('Mounting with User?', user)
      if (user) {
        this.props.setUserData(user._user)
      }
      this.props.navigation.navigate(user ? 'Main' : 'SignUp')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
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
    setUserData,
    setUserToken
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
