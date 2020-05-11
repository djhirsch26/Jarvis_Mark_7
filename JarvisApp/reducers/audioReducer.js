import {
  UPDATE_TRACKS,
  SET_IS_PLAYING,
  UPDATE_TRACK_INFO,
  UPDATE_PLAYER_INFO,
  UPDATE_SHUFFLING_INFO,
  SEEK_TRACK,
  REPEAT
} from '../constants';

var initialState = {
  tracks: [],
  trackInfo: {"album": "American Oxygen", "artist": "Rihanna", "duration": 320.161, "image": "http://i.scdn.co/image/ab67616d0000b273fcf5ae6bc3b8b7c68cee71ba", "index": 2, "name": "American Oxygen"},
  playerInfo: {
    playing: false,
    position: 0,
    repeating: REPEAT.OFF,
    shuffling: false,
    time: undefined,
  }
}

export default function(state=initialState, action) {
	switch(action.type) {
  case UPDATE_TRACKS:
    return {...state, tracks: action.payload};
  case SET_IS_PLAYING:
    return {...state, playerInfo: {...state.playerInfo, playing: action.payload.playing, time: action.payload.time}}
  case UPDATE_TRACK_INFO:
    return {...state, trackInfo: {...state.trackInfo, ...action.payload}}
  case UPDATE_PLAYER_INFO:
    return {...state, playerInfo: {...state.playerInfo, ...action.payload}}
  case UPDATE_SHUFFLING_INFO:
    return {...state, playerInfo: {...state.playerInfo, shuffling: action.payload}}
  case SEEK_TRACK:
    return {...state, playerInfo: {...state.playerInfo, position: action.payload.elpasedTime, time: action.payload.time}}
  default:
		return state;
	}
}
