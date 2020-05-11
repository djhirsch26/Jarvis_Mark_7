import React, {Component} from 'react';
import { StyleSheet, Button, Platform, Image, Text, View, ScrollView, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import firebase from '@react-native-firebase/app';
import thunk from 'redux-thunk';
import { createSwitchNavigator, createAppContainer } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {suggestShortcuts} from "react-native-siri-shortcut";

import {siriOpts} from './utils/siri'


import reducers from './reducers'
import firebaseMiddleware from './middleware/firebase'

// import the different screens
import Loading from './Components/Auth/Loading'
import SignUp from './Components/Auth/SignUp'
import Login from './Components/Auth/Login'
import Main from './Components/Main'
import Initialize from './Components/Initialize'

// create our app's navigation stack
// const AppContainer = createAppContainer(createSwitchNavigator({
//   Loading,
//   SignUp,
//   Login,
//   Main
// },
// {
//   initialRouteName: 'Loading'
// }));

const Stack = createStackNavigator();


// const AppContainer = function() {
//   return
// }

export class AppContainer extends Component {
  render() {
    return <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{ title: 'Loading' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: 'SignUp' }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ title: 'Main' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  }
}

const store = createStore(reducers, applyMiddleware(firebaseMiddleware, thunk));
global.store = store

export default class App extends Component {
  componentDidMount() {
    suggestShortcuts(siriOpts)
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <Initialize />
        <AppContainer />
      </Provider>
    );
  }
}



/********************* BREAK ***************/


// /**
//  * Sample React Native App with Firebase
//  * https://github.com/invertase/react-native-firebase
//  *
//  * @format
//  * @flow
//  */
//
// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, View } from 'react-native';
//
// import firebase from '@react-native-firebase/app';
//
// // TODO(you): import any additional firebase services that you require for your app, e.g for auth:
// //    1) install the npm package: `yarn add @react-native-firebase/auth@alpha` - you do not need to
// //       run linking commands - this happens automatically at build time now
// //    2) rebuild your app via `yarn run run:android` or `yarn run run:ios`
// //    3) import the package here in your JavaScript code: `import '@react-native-firebase/auth';`
// //    4) The Firebase Auth service is now available to use here: `firebase.auth().currentUser`
//
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
// });
//
// const firebaseCredentials = Platform.select({
//   ios: 'https://invertase.link/firebase-ios',
//   android: 'https://invertase.link/firebase-android',
// });
//
// type Props = {};
//
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native + Firebase!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//         {!firebase.apps.length && (
//           <Text style={styles.instructions}>
//             {`\nYou currently have no Firebase apps registered, this most likely means you've not downloaded your project credentials. Visit the link below to learn more. \n\n ${firebaseCredentials}`}
//           </Text>
//         )}
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
