import {
  UPDATE_TRACKS,
  SET_IS_PLAYING,
  UPDATE_TRACK_INFO,
  UPDATE_PLAYER_INFO,
  UPDATE_SHUFFLING_INFO,
  SEEK_TRACK,
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
    payload: {playing: playing, time: new Date().getTime()}
  }
}

export function updateTrackInfo(trackInfo={}) {
  return {
    type: UPDATE_TRACK_INFO,
    payload: trackInfo
  }
}

export function updatePlayerInfo(playerInfo={}) {
  return {
    type: UPDATE_PLAYER_INFO,
    payload: {...playerInfo, time: new Date().getTime()}
  }
}

export function setRepeating(repeating=true) {
  return {
    type: UPDATE_PLAYER_INFO,
    payload: {repeating}
  }
}

export function seekTrack(seekInfo) {
  return {
    type: SEEK_TRACK,
    payload: {...seekInfo, time: new Date().getTime()}
  }
}

export function setShuffling(isShuffled) {
  return {
    type: UPDATE_SHUFFLING_INFO,
    payload: isShuffled
  }
}
