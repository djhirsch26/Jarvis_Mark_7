import {
	SET_SLIDER_CONTENT,
  SET_SLIDER_ENABLE,
  SLIDER
} from '../constants';

initialState={
  content: SLIDER.BLANK,
  draggingEnabled: true
}

export default function(state=initialState, action) {
	switch(action.type) {
  case SET_SLIDER_CONTENT:
    return {...state, content: action.payload.content};
  case SET_SLIDER_ENABLE:
    return {...state, draggingEnabled: action.payload.enabled};
	default:
		return state;
	}
}
