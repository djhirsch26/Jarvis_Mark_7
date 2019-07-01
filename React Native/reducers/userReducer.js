import {
	SET_USER_DATA,
  SET_USER_TOKEN,
  TEST_AUTH
} from '../constants';

initialState={}

export default function(state=initialState, action) {
	switch(action.type) {
  case SET_USER_DATA:
    return {...state, ...action.payload};
  case SET_USER_TOKEN:
    return {...state, token: action.payload, tokenAcquired: new Date()};
	default:
		return state;
	}
}
