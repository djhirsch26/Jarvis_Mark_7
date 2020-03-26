import {
  UPDATE_TRACKS,
  SET_IS_PLAYING,
  UPDATE_TRACK_INFO,
  UPDATE_PLAYER_INFO,
  UPDATE_SHUFFLING_INFO
} from '../constants';

var initialState = {
  tracks: [],
  trackInfo: undefined,
  playerInfo: {
    playing: false,
    position: 0,
    repeating: false,
    shuffling: false,
  }
}

export default function(state=initialState, action) {
	switch(action.type) {
  case UPDATE_TRACKS:
    return {...state, tracks: action.payload};
  case SET_IS_PLAYING:
    return {...state, playerInfo: {...state.playerInfo, playing: action.payload}}
  case UPDATE_TRACK_INFO:
    return {...state, trackInfo: {...state.trackInfo, ...action.payload}}
  case UPDATE_PLAYER_INFO:
    return {...state, playerInfo: {...state.playerInfo, ...action.payload}}
  case UPDATE_SHUFFLING_INFO:
    return {...state, playerInfo: {...state.playerInfo, shuffling: action.payload}}
  default:
		return state;
	}
}
