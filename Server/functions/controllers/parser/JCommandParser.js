var CommandParser = require('./CommandParser')
var {audio} = require('./audio')
var {hello, search} = require('./other')

function init() {
  CommandParser.init()

  const a1 = (song, artist, album_or_platform) => audio(song, artist, album_or_platform)
  const a2 = (song, album_or_platform, artist) => audio(song, artist, album_or_platform)

  var commands = {
      'hi|hello (there)': hello,
      'play (me) *song (by *artist) (on *album_or_platform)': a1,
      'play (me) *song (on *album_or_platform) (by *artist)': a2,
      'show me *search':      search,
    };
  CommandParser.addCommands(commands)
}

async function parseText(message) {
    message = message.toLowerCase()
    const result = await CommandParser.parseText(message)
    return result
}


module.exports = {
  init: init,
  parseText: parseText,
}
