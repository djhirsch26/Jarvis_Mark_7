import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Header } from 'react-native'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Toolbar, Button, COLOR } from 'react-native-material-ui';

import SSH from './SSHClient'

export default class FileView extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()

    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state

    return (
      <View style={styles.container}>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement="File System"
        />
        <View style={styles.body}>
          <Text>
            This will be the file server access page
          </Text>
          <SSH/>
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
