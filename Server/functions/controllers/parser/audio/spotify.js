const Spotify = require('../../spotify')

async function generateSpotifyCommand(main_param, artist, album) {

  const query = [main_param, artist, album]
  const data = await Spotify.search(query.filter(x => x.length > 0).join(' '));

  // Filter out some extraneous data
  const results = data.data.tracks.items.map((x) => {
    const image = x.album.images.length > 0 ? x.album.images[0].url : undefined
    return {name: x.name, uri: x.uri, image_uri: image, artists: x.artists.map(x => x.name), album: x.album.name, popularity: x.popularity ? x.popularity : -1 }
  })

  // console.log(results[0].artists[0].name.toLowerCase(), query[0].toLowerCase(), results[0].artists[0].name.toLowerCase() === query[1].toLowerCase())
  const isArtist = (query[0].length > 0 && results[0].artists.includes(query[0].toLowerCase()))

  var payload;

  if (isArtist) {
    // Remove duplicate named tracks
    var seen = new Set()
    const filtered = results.filter((x) => {
      if (seen.has(x.name)) {return false}
      seen.add(x.name);
      return true;
    })

    payload = filtered;

  } else {
    payload = [results[0]]
  }

  // return ['SPOTIFY', 'PLAY', 'PLAYLIST', 'spotify:playlist:1TIzQuYM2bG6X6giwGaISF']
  return ['SPOTIFY', 'PLAY', 'TRACKS', JSON.stringify(payload)]
}

module.exports = {
  generateSpotifyCommand
}
