import * as mqtt from 'mqtt'
import {SPEECH_INPUT} from '../constants.js';
import * as readline from 'readline';

var client  = mqtt.connect('mqtt://test.mosquitto.org')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.on('connect', function () {
  console.log('Connected!')
  readTerm()
})

function readTerm() {
  rl.question('Give an input?? ', (answer) => {
    client.publish(SPEECH_INPUT, `${answer}`)
    readTerm()
  });
}
