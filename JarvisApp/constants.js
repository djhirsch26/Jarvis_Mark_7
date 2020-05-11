// Action Types
export const TEST_AUTH = 'test-auth'
export const SET_USER_DATA = 'set-user-data'
export const SET_USER_TOKEN = 'set-user-token'
export const REQUIRE_TOKEN = 'require-token'

// Colors
export const DEFAULT_BUTTON_COLOR = '#841584'
export const OFF_BUTTON_COLOR = '#545454'

// Audio Actions
export const UPDATE_TRACKS = 'update-tracks'
export const SET_IS_PLAYING = 'set-is-playing'
export const UPDATE_TRACK_INFO = 'update-track-info'
export const UPDATE_PLAYER_INFO = 'update-player-info'
export const UPDATE_SHUFFLING_INFO = 'update-shuffle-info'
export const SEEK_TRACK = 'seek-track'
export const REPEAT = {
  OFF: 'off',
  CONTEXT: 'context',
  TRACK: 'track',
}

// File Viewer actions
export const VIEW_DIR = 'view-dir'
export const FETCH_FILE = 'fetch-file'
export const CLOSE_FILE = 'close-file'

// Slider actions
export const SET_SLIDER_CONTENT = 'set-slider-content'
export const SET_SLIDER_ENABLE = 'set-slider-enable'
export const SLIDER = {
  BLANK: 1,
  AUDIO: 2,
}

// SERVER ENDPOINTS
// export const BASE_URL = 'http://localhost:3000'
// export const BASE_URL = 'http://40229a68.ngrok.io'
// export const BASE_URL = 'http://localhost:5001/jarvis-503c9/us-central1/app'
export const BASE_URL = 'http://us-central1-jarvis-503c9.cloudfunctions.net/app'

export const FILE_URL = 'file'
export const LIST_DIR = 'ls'
export const SPOTIFY_TOKEN_REFRESH = BASE_URL + '/spotify/refresh'
export const SPOTIFY_TOKEN_SWAP = BASE_URL + '/spotify/swap'
// Make sure to update this value at the Spotify Developer Dashboard
export const SPOTIFY_REDIRECT_URL = BASE_URL + '/spotify/redirect';
export const SPOTIFY_INITAL_TRACK = '1TIzQuYM2bG6X6giwGaISF'


// FILE VIEWER CONSTANTS
export const FILE_TYPE = {
  FILE: 'file',
  MEDIA: 'media'
}
export const START_DIRECTORY = '/'
