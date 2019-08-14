// Action Types
export const TEST_AUTH = 'test-auth'
export const SET_USER_DATA = 'set-user-data'
export const SET_USER_TOKEN = 'set-user-token'
export const REQUIRE_TOKEN = 'require-token'
export const UPDATE_TRACKS = 'update-tracks'
export const SET_IS_PLAYING = 'set-is-playing'

// File Viewer actions
export const VIEW_DIR = 'view-dir'
export const FETCH_FILE = 'fetch-file'
export const CLOSE_FILE = 'close-file'

// SERVER ENDPOINTS
// export const BASE_URL = 'http://localhost:3000'

export const BASE_URL = 'http://61d3cdcd.ngrok.io'
export const FILE_URL = 'file'
export const LIST_DIR = 'ls'
export const SPOTIFY_TOKEN_REFRESH = BASE_URL + '/spotify/refresh'
export const SPOTIFY_TOKEN_SWAP = BASE_URL + '/spotify/swap'

// FILE VIEWER CONSTANTS
export const FILE_TYPE = {
  FILE: 'file',
  MEDIA: 'media'
}
export const START_DIRECTORY = '/Documents'
