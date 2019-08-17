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

  protocol: [
    "bump"
  ],

  "action": function(Jarvis, params) {
    Jarvis.SpotifyPlay("spotify:playlist:1TIzQuYM2bG6X6giwGaISF", -5)
  }


}
