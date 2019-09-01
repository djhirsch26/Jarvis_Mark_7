import {
  UPDATE_TRACKS,
  SET_IS_PLAYING,
  UPDATE_TRACK_INFO,
  UPDATE_PLAYER_INFO,
  UPDATE_SHUFFLING_INFO,
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

export function updateTrackInfo(trackInfo) {
  return {
    type: UPDATE_TRACK_INFO,
    payload: trackInfo
  }
}

export function updatePlayerInfo(playerInfo) {
  return {
    type: UPDATE_PLAYER_INFO,
    payload: playerInfo
  }
}

export function setShuffling(isShuffled) {
  return {
    type: UPDATE_SHUFFLING_INFO,
    payload: isShuffled
  }
}
