import {
  UPDATE_TRACKS,
  SET_IS_PLAYING
} from '../constants'

export function updateTracks(tracks) {
  return {
    type: UPDATE_TRACKS,
    payload: tracks
  }
}

export function setIsPlaying(playing) {
  return {
    type: SET_IS_PLAYING,
    payload: playing
  }
}
