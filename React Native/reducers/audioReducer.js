import {
  UPDATE_TRACKS,
  SET_IS_PLAYING,
  UPDATE_TRACK_INFO,
  UPDATE_PLAYER_INFO
} from '../constants';

var initialState = {
  tracks: [],
  isPlaying: false,
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
    return {...state, isPlaying: action.payload}
  case UPDATE_TRACK_INFO:
    return {...state, trackInfo: {...this.state.trackInfo, ...action.payload}}
  case UPDATE_PLAYER_INFO:
    return {...state, playerInfo: {...this.state.playerInfo, ...action.payload}}
  default:
		return state;
	}
}
