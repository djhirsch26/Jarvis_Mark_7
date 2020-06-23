import React from 'react'
import { StyleSheet, Platform, Image, TouchableOpacity, Text, View, Header } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Toolbar, Button, COLOR } from 'react-native-material-ui';

import { BleManager } from 'react-native-ble-plx';

export default class Console extends React.Component {

  constructor() {
      super();
      this.manager = new BleManager({
        restoreStateIdentifier: "ID.jarvis",
        restoreStateFunction: (state) => {
          console.log("RESTORING")
          console.log(state)
        }
      });
  }

  componentDidMount() {
    const subscription = this.manager.onStateChange((state) => {
        if (state === 'PoweredOn') {
          console.log("BT ON")
            this.scanAndConnect();
            subscription.remove();
        }
    }, true);
  }

  scanAndConnect() {
    console.log("STARING SCAN")
    this.manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            // Handle error (scanning will be stopped automatically)
            return
        }

        console.log("Found Device: ", device.name)

        // Check if it is a device you are looking for based on advertisement data
        // or other criteria.
        if (device.name === 'Jarvis') {

            // Stop scanning as it's not necessary if you are scanning for one device.
            this.manager.stopDeviceScan();

            // Proceed with connection.
            device.connect()
            .then((device) => {
                return device.discoverAllServicesAndCharacteristics()
            })
            .then((device) => {
               // Do work on device with services and characteristics
               console.log(device)
               // monitorCharacteristicForDevice(deviceIdentifier, serviceUUID, characteristicUUID, listener, transactionId)
            })
            .catch((error) => {
                // Handle errors
            });
        }
    });
}

  render() {

    return (
      <View style={styles.container}>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement="File System"
        />
        <View style={styles.body}>
          <Text>
            Console
          </Text>
          <TouchableOpacity onPress={this.scanAndConnect.bind(this)}>
          <Text> SCAN </Text>
          </TouchableOpacity>
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
