import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Header } from 'react-native'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/FontAwesome';

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
        <Text>
          This will be the file server access page
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
