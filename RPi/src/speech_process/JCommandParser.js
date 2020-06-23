var CommandParser = require('./CommandParser')

function init() {
  CommandParser.init()

  const showFlickr = function(stuff) {
    console.log("Showing stuff: ", stuff)
  }

  const hello = function() {
    console.log("Hello Mam")
  }

  var commands = {
      'hello (there)':        hello,
      'show me *search':      showFlickr,
    };
  CommandParser.addCommands(commands)

}

function parseText(message) {
  return result = CommandParser.parseText(message)
}


module.exports = {
  init: init,
  parseText: parseText,
}
