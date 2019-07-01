import firebase from 'react-native-firebase'

import {
  SET_USER_TOKEN,
  REQUIRE_TOKEN
} from '../constants'

export default function firebaseMiddleware({ dispatch, getState }) {
  return next => (action) => {

    if (action.type == REQUIRE_TOKEN) {

      const {token, acquiredToken} = getState().user

      if (!token || Date.now() - acquiredToken > 60*60*1000) {
        return firebase.auth().currentUser.getIdToken(true).then((token) => {
          dispatch({
            type: SET_USER_TOKEN,
            payload: token
          });
          next(action.payload(token))
        })
      }
      else {
        next(action.payload(token))
      }
    }

    next(action)
  };
}
