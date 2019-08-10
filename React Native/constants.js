// Action Types
export const TEST_AUTH = 'test-auth'
export const SET_USER_DATA = 'set-user-data'
export const SET_USER_TOKEN = 'set-user-token'
export const REQUIRE_TOKEN = 'require-token'

// File Viewer actions
export const VIEW_DIR = 'view-dir'
export const FETCH_FILE = 'fetch-file'
export const CLOSE_FILE = 'close-file'

// SERVER ENDPOINTS
// export const BASE_URL = 'http://localhost:3000'

export const BASE_URL = 'http://83ade724.ngrok.io'
export const FILE_URL = 'file'
export const LIST_DIR = 'ls'
export const SPOTIFY_TOKEN_REFRESH = BASE_URL + '/spotify/refresh'

// FILE VIEWER CONSTANTS
export const FILE_TYPE = {
  FILE: 'file',
  MEDIA: 'media'
}
export const START_DIRECTORY = '/Documents'
