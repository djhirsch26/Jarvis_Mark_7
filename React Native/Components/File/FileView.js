import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Header, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Toolbar, Button, COLOR } from 'react-native-material-ui';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import FileViewer from 'react-native-file-viewer';
import Video from 'react-native-video';
import RNFetchBlob from 'rn-fetch-blob';

import {getType} from '../../utils/API';
import {FILE_TYPE} from '../../constants'

import {
  listDirectory,
  changeDirectory,
  fetch,
  closeFile
} from '../../actions'

const FOLDER = 'folder'
const FILE = 'file'
const UP_ARROW = 'arrow-up'
const UP_ONE = 'up-one'
const ROOT = '/'

class FileView extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.props.listDirectory(ROOT)
    this.setState({ currentUser })
  }

  onPress(name, type) {
    return () => {
      switch(type) {
        case FOLDER:
          var newPath = this.props.pwd + (this.props.pwd==ROOT ? '' : '/') + name
          console.log('cd into ' + name, newPath)
          this.props.changeDirectory(newPath);
          break;
        case UP_ONE:
          if (this.props.pwd == ROOT) {
            console.warn('Trying to cd above ROOT');
            return;
          }
          var newPath = this.props.pwd.substring(0, this.props.pwd.lastIndexOf("/"));
          newPath = newPath ? newPath : ROOT
          console.log('move up into ' + name, newPath)
          this.props.changeDirectory(newPath);
          break;
        case FILE:
        default:
          var newPath = this.props.pwd + (this.props.pwd==ROOT ? '' : '/') + name
          console.log('fetch ' + name, newPath)
          this.props.fetch(newPath)
      }
    }
  }

  renderItem({item, index}) {
    const name = item.name == ROOT ? 'root' : item.name
    var icon; var type;
    switch (item.type) {
      case 'd':
        icon = FOLDER;
        type = FOLDER;
        break;
      case UP_ONE:
        icon = UP_ARROW;
        type = UP_ONE;
        break;
      case '-':
      default:
        icon = FILE;
        type = FILE
    }
    return (
      <TouchableOpacity
       onPress={this.onPress(name, type).bind(this)}
       >
      <View style={styles.listView}>
          <Icon name={icon} size={20} color='gray' style={styles.listIcon}/>
          <Text style={styles.listName}>
            {name}
          </Text>
      </View>
      </TouchableOpacity>

    )
  }

  onBuffer(data) {
    console.log('buffering', data)
  }

  videoError(e) {
    console.log('Video error', e)
  }

  onDismiss(data) {
    console.log('dismiss', data)
    this.props.closeFile();
  }

  render() {
    const { currentUser } = this.state

    if (this.props.queuedFile) {
      const path = this.props.path;
      // const path = '/Users/daniel/Library/Developer/CoreSimulator/Devices/6AB44373-02DE-4176-9DAF-E7406A8BF780/data/Containers/Data/Application/0653B07D-1168-4818-81BF-F489277B9DC7/Documents/Documents/ClippedWake2.mp3'
      // const type = getType(this.props.path)
      // console.log('FILE QUEUED of type ' + type + ' from ' + path)
      // switch(type) {
      //   case FILE_TYPE.MEDIA:
      //     return (
      //       <View style={styles.container}>
      //         <Text>HELLO FRIEND</Text>
      //         <Video source={{uri: 'file://' + path}}   // Can be a URL or a local file.
      //          ref={(ref) => {
      //            this.player = ref
      //          }}                                      // Store reference
      //          onBuffer={this.onBuffer}                // Callback when remote video is buffering
      //          onError={this.videoError}               // Callback when video cannot be loaded
      //         />
      //       </View>
      //     )
      //     break;
      //   case FILE_TYPE.FILE:
      //   default:
          FileViewer.open(path, {
            onDismiss: this.onDismiss.bind(this)
          })
          .then(() => {
            console.log('succesfully opened: ' + path)
          })
          .catch(error => {
            console.log('could not open: ' + path)
          });
        // }
        // return (<View/>)
    }

    var listData = this.props.contents ? this.props.contents : [];
    if (listData.length > 0 && this.props.pwd != ROOT) {
      listData= [{
        name: '..',
        type: UP_ONE
      }].concat(listData)
    }

    return (
      <View style={styles.container}>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement="File System"
        />
        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              PWD: ~{this.props.pwd}
            </Text>
          </View>
          <View style={styles.list}>
            <FlatList
            data={listData}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={(item,index) => (item.name + index)}
            />
          </View>
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
    listDirectory,
    changeDirectory,
    fetch,
    closeFile,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  body: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    textAlign: 'left',
    backgroundColor: '#b9bec7'
  },
  headerText: {
    fontSize: 20,
  },
  list: {
    alignSelf: "stretch",
    padding: 0,
    flex: 1
  },
  listView: {
    flex: 1,
    width: '100%',
    padding: 10,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
  },
  listName: {
    fontSize: 18,
    textAlign: 'left',
    flex: 8
  },
  listIcon: {
    textAlign: 'left',
    flex: 1,
  }
})
