import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import firebase from '@react-native-firebase/app'
import Icon from 'react-native-vector-icons/FontAwesome';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from './Home/Home'
import FileView from './File/FileView'
import Audio from './Audio/Audio'
import Console_ from './File/Console'

import AudioEvents from './Audio/AudioEvents'

const homeIcon = ({color, focused}) => <Icon name="home" size={focused ? 18 : 14} color={color}/>;
const fileIcon = ({color, focused}) => <Icon name="file" size={focused ? 18 : 14} color={color}/>;
const spotifyIcon = ({color, focused}) => <Icon name="spotify" size={focused ? 18 : 14} color={color}/>;
const consoleIcon = ({color, focused}) => <Icon name="laptop" size={focused ? 18 : 14} color={color}/>;

/** Initialize Global Event Listeners */
global.audioEvents = new AudioEvents();

/* End Global Event Listeners */

console.log(createBottomTabNavigator)
const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator initialRouteName={'Audio'} tabBarOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: '#808080',
      }}>
      <Tab.Screen name="Home" component={Home} options={{tabBarIcon: homeIcon}} />
      <Tab.Screen name="Files" component={FileView} options={{tabBarIcon: fileIcon}}/>
      <Tab.Screen name="Audio" component={Audio} options={{tabBarIcon: spotifyIcon}}/>
      <Tab.Screen name="Console" component={Console_} options={{tabBarIcon: consoleIcon}}/>
    </Tab.Navigator>
  );
}

// export default Main = createMaterialBottomTabNavigator(
//   {
//     Home: {screen: Home,  navigationOptions: { title: 'Home', tabBarIcon: homeIcon}},
//     FileView: {screen: FileView,  navigationOptions: { title: 'Files', tabBarIcon: fileIcon}},
//     Audio: {screen: Audio,  navigationOptions: { title: 'Audio', tabBarIcon: spotifyIcon}},
//     Console_: {screen: Console_,  navigationOptions: { title: 'Console', tabBarIcon: consoleIcon}},
//   },
//   {
//     initialRouteName: 'Audio',
//     activeColor: '#000000',
//     inactiveColor: '#808080',
//     barStyle: {
//       backgroundColor: '#f2f2f2',
//       borderTopWidth: 1,
//       borderColor: '#c2c2c2'
//      },
//   }
// );
