import {
	TEST_AUTH,
  LIST_DIR
} from '../constants';

var initialState = {}

export default function(state=initialState, action) {
	switch(action.type) {
  case TEST_AUTH:
    console.log("IN TEST AUTH REDUCER", action.payload)
    return {...state, testPayload: action.payload};
  case LIST_DIR:
    console.log("IN LIST_DIR", action.payload)
    return {...state, testPayload: action.payload};
  default:
		return state;
	}
}
