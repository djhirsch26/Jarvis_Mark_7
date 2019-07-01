import React from 'react'
import { View, ScrollView, Text, TextInput, ActivityIndicator, Button, StyleSheet } from 'react-native'
import SSHClient from 'react-native-ssh-sftp';
import {privateKey, publicKey} from './private/private_key'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase'

import {testAuth} from '../../actions'



class SSH extends React.Component {

  state = {
    connected: false,
    output: ''
  }

  componentDidMount() {

  }

  runLS() {
    if (this.state.connected) {
      console.log(this.client)

      var command = 'ls';
      this.client.execute(command, (error, output) => {
        if (error) {
          console.warn(error);
          this.setState({output: error});
        }
        if (output)
          console.log(output);
          this.setState({output});
      });
    }
  }

  runCommand() {
    if (this.state.connected) {
      console.log(this.client)

      const command = this.state.command + '\n';
      console.log("Command to run is: ", command)
      this.client.writeToShell(command, (error, output) => {
        if (error) {
          console.log("Encountered Error")
          console.warn(error);
          this.setState({output: error.message});
        }
        if (output || output=="") {
          console.log("Command Succesful!");
          console.log(output);
          this.setState({output});
        }
      });

      this.client.on('Shell', (event) => {
        if (event) {
          console.log("HEY", event);
        }
      });
    }
  }

  onConnectPress() {
    const client = new SSHClient('127.0.0.1', 3030, 'jarvisRemote', 'jarvis', function(error) {
      if (error) {
        console.warn(error);
        this.setState({connected: false})
      }
      else {
        this.client = client;
        const ptyType = 'vanilla';
        this.client.startShell(ptyType, (error) => {
          if (error) {
            console.warn(error);
          }
        });
        this.setState({connected: true})
      }
    }.bind(this));
  }

  onTestServerPress() {
    this.props.testAuth(this.props.user.token)
  }

  onTextSubmit() {
    this.runCommand()
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Hello World!</Text>
        <Button
          onPress={this.onConnectPress.bind(this)}
          title="Connect to Client"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Text> Status: {this.state.connected ? "Connected" : "Not Connected"} </Text>
        <Button
          onPress={this.runLS.bind(this)}
          title="Run LS"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Text> {this.state.output ?  `${this.state.output}` : ""} </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({command: text})}
          onEndEditing={this.onTextSubmit.bind(this)}
          value={this.state.text}
          autoCapitalize={'none'}
          autoCompleteType={'off'}
          autoCorrect={false}
        />
        <Button
          onPress={this.runCommand.bind(this)}
          title="Submit Command"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={this.onTestServerPress.bind(this)}
          title="TEST THE SERVER"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    testAuth,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SSH);

const styles = StyleSheet.create({
  container: {

  }
})
