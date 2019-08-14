import { combineReducers } from 'redux';
import fileReducer from './fileReducer';
import userReducer from './userReducer';
import fileViewReducer from './fileViewReducer';
import audioReducer from './audioReducer';


const rootReducer = combineReducers({
  file: fileReducer,
  user: userReducer,
  fileView: fileViewReducer,
  audio: audioReducer,
});

export default rootReducer;
