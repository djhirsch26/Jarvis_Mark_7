import React from 'react'
import { StyleSheet, Platform, Image, ScrollView, Text, View } from 'react-native'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/FontAwesome';

import { Toolbar, Button, COLOR } from 'react-native-material-ui';

import ButtonContainer from './ButtonContainer'

import * as Skills from '../../skills'

export default class Home extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()

    this.setState({ currentUser })
  }

  render() {

    const buttons  = <ScrollView>
      <ButtonContainer skills={Skills}/>
    </ScrollView>

    const { currentUser } = this.state

    return (
      <View style={styles.container}>
        <Toolbar
          style={{container: styles.toolbar}}
          onLeftElementPress={() => console.log("BACK")}
          centerElement="Jarvis"
        />
        <View style={styles.body}>
          <View style={styles.topText}>
            <Text>
              This will be the home page
            </Text>
            <Text>
              User {currentUser && currentUser.email} is logged in!
            </Text>
          </View>
          <View style={styles.buttons}>
            {buttons}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  toolbar: {
    paddingTop: 25,
    paddingBottom: 10,
    backgroundColor: '#2196F3',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
