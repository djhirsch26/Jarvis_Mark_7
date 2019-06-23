import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/FontAwesome';

import { Toolbar, Button, COLOR } from 'react-native-material-ui';

export default class Home extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()

    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state

    return (
      <View style={styles.container}>
        <Toolbar style={styles.header}
          onLeftElementPress={() => console.log("BACK")}
          centerElement="Jarvis"
        />
        <View style={styles.body}>
          <Text>
            This will be the home page
          </Text>
          <Text>
            User {currentUser && currentUser.email} is logged in!
          </Text>
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
  header: {
    justifyContent: 'flex-start',
    textAlign: 'center',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
