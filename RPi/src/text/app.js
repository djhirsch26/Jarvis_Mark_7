var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
var {SPEECH_INPUT} = require('../constants');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.on('connect', function () {
  console.log('Connected!')
  readTerm()
})

function readTerm() {
  rl.question('Give an input? ', (answer) => {
    client.publish(SPEECH_INPUT, `${answer}`)
    readTerm()
  });
}
