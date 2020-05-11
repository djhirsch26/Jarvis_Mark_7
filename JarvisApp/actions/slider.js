import {
  SET_SLIDER_CONTENT,
  SET_SLIDER_ENABLE,
} from '../constants'

export function setSliderContent(content) {
  return {
    type: SET_SLIDER_CONTENT,
    payload: content
  }
}

export function setSliderEnabled(enabled) {
  return {
    type: SET_SLIDER_ENABLE,
    payload: {enabled}
  }
}
