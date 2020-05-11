import { combineReducers } from 'redux';
import fileReducer from './fileReducer';
import userReducer from './userReducer';
import fileViewReducer from './fileViewReducer';
import audioReducer from './audioReducer';
import sliderReducer from './sliderReducer';


const rootReducer = combineReducers({
  file: fileReducer,
  user: userReducer,
  fileView: fileViewReducer,
  audio: audioReducer,
  slider: sliderReducer,
});

export default rootReducer;
