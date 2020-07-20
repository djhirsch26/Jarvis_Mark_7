const {SOUNDCLOUD, SPOTIFY, DEFAULT_PLATFORM} = require('./constants')
const {generateSpotifyCommand} = require('./spotify')
const {generateSoundcloudCommand} = require('./soundcloud')

const BB_11 = '317238901'


const audio = async function(main_param, artist='', album_or_platform='') {
  if (!main_param) {
    console.error("At least one search param required")
    return;
  }
  const isPlatform = isPlatform_(album_or_platform)
  const platform = isPlatform ? getPlatform(album_or_platform) : DEFAULT_PLATFORM
  const album = isPlatform ? '' : album_or_platform

  console.log("Title: ", main_param, "\tArtist: ", artist, "\tAlbum: ", album, "\tPlatform: ", platform)
  const query = [main_param, artist, album].map(x => x.trim())

  switch(platform) {
    case SOUNDCLOUD:
      return await generateSoundcloudCommand(...query)
    case SPOTIFY:
    default:
      return await generateSpotifyCommand(...query)
  }

}

function isPlatform_(platformName) {
  return platformName && (platformName.toLowerCase()=='spotify' || platformName.toLowerCase()=='soundcloud')
}

function getPlatform(platformName) {
  switch(platformName.toLowerCase()) {
    case 'soundcloud':
      return SOUNDCLOUD
    case 'spotify':
      return SPOTIFY
  }
  return undefined
}

module.exports = {
  audio
}
