import {
  VIEW_DIR,
  REQUIRE_TOKEN,
  FETCH_FILE
} from '../constants'

import {API} from '../utils/API';

export function listDirectory(path) {
  const withToken = (token) => {
    const request = API.ls(token, path)
    return (dispatch) => {
      request.then((result) => {
        dispatch({
          type: VIEW_DIR,
          payload: {result, path}
        })
      }).catch((e) => {
        console.log(e.response.data.message)
      })
    }
  }

  return {
    type: REQUIRE_TOKEN,
    payload: withToken,
  }
}

export function changeDirectory(newPath) {
  return listDirectory(newPath)
}

export function fetch(path) {
  const withToken = (token) => {
    const request = API.fetch(token, path)
    return (dispatch) => {
      request.then((result) => {
        console.log('FILE FETCHED AND SAVED?', result)
        dispatch({
          type: FETCH_FILE,
          payload: {result, path}
        })
      }).catch((e) => {
        console.log(e.response.data.message)
      })
    }
  }

  return {
    type: REQUIRE_TOKEN,
    payload: withToken,
  }
}
