export function getPlayerPosition(playerInfo, trackInfo) {
  const currentTime = new Date().getTime()
  var song_location = playerInfo.position
  song_location += playerInfo.playing && !playerInfo.buffering ? Math.max(0,Math.floor((currentTime - playerInfo.time)/1000)) : 0
  song_location = isNaN(song_location) || song_location <= 0 ? 0 : song_location
  return {location: song_location, percent: song_location/trackInfo.duration}
}
