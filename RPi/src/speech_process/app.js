var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
var {SPEECH_INPUT, COMMAND_INPUT} = require('../constants');
var JCommandParser = require('./JCommandParser')

client.on('connect', function () {
  client.subscribe(SPEECH_INPUT, function (err) {})
  JCommandParser.init()
})

client.on('message', function (topic, message) {
  // message is Buffer
  switch(topic) {
    case SPEECH_INPUT:
      console.log("Got Speech Input: ", message.toString())
      client.publish(COMMAND_INPUT, JSON.stringify(parseCommand(message)))
      break;
    default:
      console.log("Unrecognized Topic: ", topic, " with message: ", message.toString())
      console.log(message.toString())
  }
})

function parseCommand(message) {
  const command = parseCommandInternal(message.toString().trim())
  return {command}
}

function parseCommandInternal(message) {
  const split = message.split(' ')
  const first_word = split[0]
  const last_word = split[split.length-1]

  if (first_word == 'protocol') {
    split.shift()
    return parseProtocol(split.join(' '))
  } else if (last_word == 'protocol') {
    split.pop()
    return parseProtocol(split.join(' '))
  } else {
    return parseMessage(message)
  }

function parseProtocol(protocol) {
  const BB_11 = 317238901
  return ['PLAY', 'SOUNDCLOUD', BB_11]
}

function parseMessage(message) {
  const BB_11 = 317238901

  console.log("Parsing Message!")
  var result = JCommandParser.parseText(message)


  return ['PLAY', 'SOUNDCLOUD', BB_11]
}

}
