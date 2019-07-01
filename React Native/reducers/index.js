import { combineReducers } from 'redux';
import fileReducer from './fileReducer';
import userReducer from './userReducer';
import fileViewReducer from './fileViewReducer';


const rootReducer = combineReducers({
  file: fileReducer,
  user: userReducer,
  fileView: fileViewReducer,
});

export default rootReducer;
