import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Header } from 'react-native'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Toolbar, Button, COLOR } from 'react-native-material-ui';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {
  listDirectory,
} from '../../actions'

class FileView extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.props.listDirectory(this.props.pwd)
    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state

    console.log(this.props.contents)

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
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    ...state.fileView,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    listDirectory
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileView);

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
