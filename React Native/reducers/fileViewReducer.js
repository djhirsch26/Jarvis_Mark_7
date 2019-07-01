import {
  VIEW_DIR
} from '../constants';

var initialState = {
  pwd: '/',
  contents: []
}

export default function(state=initialState, action) {
	switch(action.type) {
  case VIEW_DIR:
    return {...state, contents: action.payload.data};
  default:
		return state;
	}
}
