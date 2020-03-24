import {
  SET_USER_DATA,
  SET_USER_TOKEN
} from '../constants'

export function setUserData(user_data) {
  return {
    type: SET_USER_DATA,
    payload: user_data
  }
}

export function setUserToken(token) {
  return {
    type: SET_USER_TOKEN,
    payload: token
  }
}
