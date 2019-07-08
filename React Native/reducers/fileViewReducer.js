import {
  VIEW_DIR,
  FETCH_FILE,
} from '../constants';

var initialState = {
  pwd: '/',
  contents: []
}

export default function(state=initialState, action) {
	switch(action.type) {
  case VIEW_DIR:
    return {...state, contents: action.payload.result.data, pwd: action.payload.path};
  case FETCH_FILE:
    return {...state}
  default:
		return state;
	}
}
