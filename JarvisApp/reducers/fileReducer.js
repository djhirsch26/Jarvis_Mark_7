import {
	TEST_AUTH,
  LIST_DIR
} from '../constants';

var initialState = {}

export default function(state=initialState, action) {
	switch(action.type) {
  case TEST_AUTH:
    return {...state, testPayload: action.payload};
  case LIST_DIR:
    return {...state, testPayload: action.payload};
  default:
		return state;
	}
}
