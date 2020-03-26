import {
  VIEW_DIR,
  REQUIRE_TOKEN,
  FETCH_FILE,
  CLOSE_FILE
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
    console.log('Making API CALL')
    // .then((res) => {
    //   // the temp file path
    //   console.log('The file saved to ', res.path())
    // })
    //
    // return {
    //   type: 'nasdas',
    //   payload: "rorar",
    // }


    const request = API.fetch(token, path)
    return (dispatch) => {
      request.then((result) => {
        console.log("Recieving Result")
        console.log(request)
        const path = result.path()

        dispatch({
          type: FETCH_FILE,
          payload: {path: path}
        })


      }).catch((e) => {
        console.log('ESTOY MALO', e)
        console.log(e.response.data.message)
      })
    }
  }

  return {
    type: REQUIRE_TOKEN,
    payload: withToken,
  }
}

export function closeFile() {
  return {
    type: CLOSE_FILE,
    payload: {}
  }
}
