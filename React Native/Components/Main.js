import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/FontAwesome';

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Home from './Home/Home'
import FileView from './File/FileView'
import Audio from './Audio/Audio'
import Console_ from './File/Console'

import AudioEvents from './Audio/AudioEvents'

const homeIcon = ({focused, tintColor}) => <Icon name="home" size={20} color={tintColor}/>;
const fileIcon = ({focused, tintColor}) => <Icon name="file" size={20} color={tintColor}/>;
const spotifyIcon = ({focused, tintColor}) => <Icon name="spotify" size={20} color={tintColor}/>;
const consoleIcon = ({focused, tintColor}) => <Icon name="laptop" size={20} color={tintColor}/>;

/** Initialize Global Event Listeners */
global.audioEvents = new AudioEvents();

/* End Global Event Listeners */


export default Main = createMaterialBottomTabNavigator(
  {
    Home: {screen: Home,  navigationOptions: { title: 'Home', tabBarIcon: homeIcon}},
    FileView: {screen: FileView,  navigationOptions: { title: 'Files', tabBarIcon: fileIcon}},
    Audio: {screen: Audio,  navigationOptions: { title: 'Audio', tabBarIcon: spotifyIcon}},
    Console_: {screen: Console_,  navigationOptions: { title: 'Console', tabBarIcon: consoleIcon}},
  },
  {
    initialRouteName: 'Home',
    activeColor: '#000000',
    inactiveColor: '#808080',
    barStyle: {
      backgroundColor: '#f2f2f2',
      borderTopWidth: 1,
      borderColor: '#c2c2c2'
     },
  }
);
