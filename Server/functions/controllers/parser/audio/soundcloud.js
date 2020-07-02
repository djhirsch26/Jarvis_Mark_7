async function generateSoundcloudCommand(title, artist, album) {
  return ['SOUNDCLOUD', 'PLAY', 'TRACKS', JSON.stringify([BB_11])]
}

module.exports = {
  generateSoundcloudCommand
}
