import {
  VIEW_DIR,
  REQUIRE_TOKEN,
} from '../constants'

import {API} from '../utils/API';

export function listDirectory(path) {
  const withToken = (token) => {
    const request = API.ls(token, path)
    return (dispatch) => {
      request.then((result) => {
        dispatch({
          type: VIEW_DIR,
          payload: result
        })
      }).catch((e) => {
        console.log(e.response)
      })
    }
  }

  return {
    type: REQUIRE_TOKEN,
    payload: withToken,
  }
}
