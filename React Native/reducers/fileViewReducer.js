import {
  VIEW_DIR,
  FETCH_FILE,
  CLOSE_FILE,
  START_DIRECTORY
} from '../constants';

var initialState = {
  pwd: START_DIRECTORY,
  contents: [],
  queuedFile: false,
  path: undefined,
}

export default function(state=initialState, action) {
	switch(action.type) {
  case VIEW_DIR:
    return {...state, contents: action.payload.result.data, pwd: action.payload.path};
  case FETCH_FILE:
    return {...state, queuedFile: true, path: action.payload.path}
  case CLOSE_FILE:
    return {...state, queuedFile: false}
  default:
		return state;
	}
}
