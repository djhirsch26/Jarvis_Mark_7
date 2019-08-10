import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Header, FlatList, ScrollView, TouchableOpacity, StatusBar} from 'react-native'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Toolbar, Button, COLOR } from 'react-native-material-ui';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import FileViewer from 'react-native-file-viewer';
import Video from 'react-native-video';
import RNFetchBlob from 'rn-fetch-blob';

import {getType} from '../../utils/API';
import {
  FILE_TYPE,
  START_DIRECTORY
} from '../../constants'

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
    this.props.listDirectory(START_DIRECTORY)
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
          <Icon name={icon} size={24} color='gray' style={styles.listIcon}/>
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

    const statusBar = this.props.queuedFile ? <StatusBar barStyle="dark-content" /> : <StatusBar barStyle="light-content" />

    if (this.props.queuedFile) {
      const path = this.props.path;
          FileViewer.open(path, {
            onDismiss: this.onDismiss.bind(this)
          })
          .then(() => {
            console.log('succesfully opened: ' + path)
          })
          .catch(error => {
            console.log('could not open: ' + path)
          });
    }

    var listData = this.props.contents ? this.props.contents : [];

    //Sort and filter
    listData = listData.filter(file => !(file.name.charAt(0)=='.' || file.name.charAt(0)=='$'))
    listData = listData.sort((a,b) => {
      return a.name.localeCompare(b.name)
    })

    var rightElement = undefined;
    if (this.props.pwd != ROOT) {
      listData= [{
        name: '..',
        type: UP_ONE
      }].concat(listData)
      rightElement = "arrow-upward"
    }

    const leftElement =
      <ScrollView
      horizontal
      style={styles.flex}
      ref={(s) => this.scrollView = s}
      onContentSizeChange={(contentWidth, contentHeight)=>{
        this.scrollView.scrollToEnd({animated: true});
      }}
      >
          <Text style={styles.toolbarTitle}>
          Path: {this.props.pwd}
          </Text>
      </ScrollView>

    return (
      <View style={styles.container}>
        {statusBar}
        <View style={styles.body}>
          <Toolbar
            leftElement={leftElement}
            style={{
              container: styles.toolbar,
              leftElementContainer: styles.toolbarHeader,
              centerElementContainer: styles.empty,
            }}
            rightElement={rightElement}
            onRightElementPress={this.onPress("..", UP_ONE).bind(this)}
          />
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
  flex: {
    flex: 1
  },
  empty: {
    flex: 0
  },
  toolbar: {
    flex: .05,
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 15,
    backgroundColor: '#2196F3',
  },
  toolbarHeader: {
    flex: 100,
    marginLeft: 20,
  },
  toolbarTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '500',
    flex: .5,
  },
  list: {
    alignSelf: "stretch",
    padding: 0,
    flex: 1
  },
  listView: {
    flex: 1,
    width: '100%',
    padding: 15,
    paddingRight: 10,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
  },
  listName: {
    fontSize: 20,
    textAlign: 'left',
    flex: 8
  },
  listIcon: {
    textAlign: 'left',
    flex: 1,
  }
})
