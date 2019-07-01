import {
	TEST_AUTH
} from '../constants';

var initialState = {}

export default function(state=initialState, action) {
	switch(action.type) {
  case TEST_AUTH:
    console.log("IN TEST AUTH REDUCER", action.payload)
    return {...state, testPayload: action.payload};
	default:
		return state;
	}
}
