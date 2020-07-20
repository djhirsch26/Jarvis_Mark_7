var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')

const SERVICE_UUID = '304d6227cbd540a5919913cf1fc01003'

const DEV_NAME = 'Jarvis'

const bleno = require('@abandonware/bleno');
console.log("HUH")
bleno.on('stateChange', function(state) {
    console.log('on stateChange: ' + state);
    if (state === 'poweredOn') {
      console.log("WOW")
      bleno.startAdvertising(DEV_NAME, ['181C']);
    } else {
      bleno.stopAdvertising();
    }
});

// var data = Buffer(3);
// var now = new Date();
// data.writeUInt8(now.getHours(), 0);
// data.writeUInt8(now.getMinutes(), 1);
// data.writeUInt8(now.getSeconds(), 2);
// callback(data);
this.callback = null;
this.temp = "SADDD"

bleno.on('advertisingStart', (function(error) {
  if (!error) {
    bleno.setServices([
      // link loss service
      new bleno.PrimaryService({
        uuid: '181C',
        characteristics: [
          // Alert Level
          new bleno.Characteristic({
            value: 0,
            uuid: '181C',
            properties: ['read'],
            onSubscribe(offset, callback) {
              this.callback = callback
              console.log(this)
              // callback(this.RESULT_SUCCESS, octets);
            },
          }),
        ],
      }),
    ]);
  }
}).bind(this));


const {SPEECH_INPUT, COMMAND_INPUT} = require('../constants');

client.on('connect', function () {
  client.subscribe(SPEECH_INPUT, function (err) {
    // if (!err) {
    //   client.publish(SPEECH_INPUT, 'Hello mqtt')
    // }
  })
})

client.on('message', (function (topic, message) {
  // message is Buffer
  switch(topic) {
    case SPEECH_INPUT:
      console.log("Got speech Input: ", message.toString())
      console.log(this)
      break;
    default:
      console.log("Unrecognized Topic: ", topic, " with message: ", message.toString())
      console.log(message.toString())
  }
}).bind(this))
