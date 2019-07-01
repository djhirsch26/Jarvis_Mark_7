import {
  TEST_AUTH,
  REQUIRE_TOKEN,
  LIST_DIR,
} from '../constants'

import {API} from '../utils/API';

export function testAuth() {
  const withToken = (token) => {
    const request = API.testAuth(token)
    return (dispatch) => {
      request.then((result) => {
        dispatch({
          type: TEST_AUTH,
          payload: result
        })
      }).catch((e) => {
        console.log(e, "Authentication Test Error")
      })
    }
  }

  return {
    type: REQUIRE_TOKEN,
    payload: withToken,
  }
}

export function listDirectory_(path) {
  const withToken = (token) => {
    const request = API.ls(token, path)
    return (dispatch) => {
      request.then((result) => {
        dispatch({
          type: LIST_DIR,
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
