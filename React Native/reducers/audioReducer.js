import {
  UPDATE_TRACKS,
  SET_IS_PLAYING,
} from '../constants';

var initialState = {
  tracks: [],
  isPlaying: false
}

export default function(state=initialState, action) {
	switch(action.type) {
  case UPDATE_TRACKS:
    return {...state, tracks: action.payload};
  case SET_IS_PLAYING:
    return {...state, isPlaying: action.payload}
  default:
		return state;
	}
}
