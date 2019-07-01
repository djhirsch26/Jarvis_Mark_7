import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/FontAwesome';

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Home from './Home/Home'
import FileView from './File/FileView'
import Console_ from './File/Console'


const homeIcon = ({focused, tintColor}) => <Icon name="home" size={20} color={tintColor}/>;
const fileIcon = ({focused, tintColor}) => <Icon name="file" size={20} color={tintColor}/>;
const consoleIcon = ({focused, tintColor}) => <Icon name="laptop" size={20} color={tintColor}/>;


export default Main = createMaterialBottomTabNavigator(
  {
    Home: {screen: Home,  navigationOptions: { title: 'Home', tabBarIcon: homeIcon}},
    FileView: {screen: FileView,  navigationOptions: { title: 'Files', tabBarIcon: fileIcon}},
    Console_: {screen: Console_,  navigationOptions: { title: 'Console', tabBarIcon: consoleIcon}},

  },
  {
    initialRouteName: 'FileView',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
  }
);
