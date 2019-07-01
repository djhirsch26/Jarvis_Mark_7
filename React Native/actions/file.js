import {
  TEST_AUTH,
  REQUIRE_TOKEN,
} from '../constants'

import {API} from '../utils/API';

export function testAuth(uid) {
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
