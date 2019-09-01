export const play = {
  "triggers": [
    "spotify play",
    "play *song",
    "play *song on spotify",
  ],

  "action": function(Jarvis, song) {
    if (song) {
      Jarvis.SpotifySearchAndPlay(song)
    }
    else {
      Jarvis.SpotifyPlay()
    }
  }
}

export const pause = {
  "triggers": [
    "spotify pause",
  ],

  "action": function(Jarivs, params) {
    Jarvis.SpotifyPause()
  }
}

export const next = {
  "triggers": [
    "spotify next",
  ],

  "action": function(Jarivs, params) {
    Jarvis.SpotifyNext()
  }
}

export const previous = {
  "triggers": [
    "spotify previous",
  ],

  "action": function(Jarivs, params) {
    Jarvis.SpotifyPrevious()
  }
}

export const shuffle = {
  "triggers": [
    "spotify shuffle",
  ],

  "action": function(Jarivs, params) {
    Jarvis.SpotifyShuffle()
  }
}

export const playMyPlaylist = {
  triggers: [
    "lets bump",
    "drop my needle",
    "gimme some tunes",
  ],
  hasButton: true,
  buttonText: "Play My Playlist",
  protocol: [
    "bump Protocol"
  ],
  action: function(Jarvis, params) {
    const tracks = Jarvis.SpotifyTracks("1TIzQuYM2bG6X6giwGaISF")
    tracks.then((data) => {
      console.log(data.length)
      var offset = Math.random()*data.length + 1
      Jarvis.SpotifyPlay("spotify:playlist:1TIzQuYM2bG6X6giwGaISF", offset)
    }).catch(()=>{})
  }
}

export const avengers = {
  triggers: [
    "avengers",
    "assemble",
  ],
  hasButton: true,
  buttonText: "A",
  protocol: [
    "Avengers Protocol"
  ],
  action: function(Jarvis, params) {
    Jarvis.SpotifyPlay("spotify:track:0OVtnS3l4vThGxkdqCxN6K")
  }
}

export const playRecent = {
  triggers: [
    "lets bump",
    "drop my needle",
    "gimme some tunes",
  ],
  hasButton: true,
  buttonText: "Recent Bias",
  protocol: [
    "bump"
  ],

  action: function(Jarvis, params) {
    Jarvis.SpotifyShuffle(true)
    const tracks = Jarvis.SpotifyTracks("1TIzQuYM2bG6X6giwGaISF")
    tracks.then((data) => {
      console.log(data)
      console.log(data.length)
      var recent = Math.random()*5 + 1
      var offset = data.length - recent
      Jarvis.SpotifyPlay("spotify:playlist:1TIzQuYM2bG6X6giwGaISF", offset)
    }).catch(()=>{})
    //
  }
}
