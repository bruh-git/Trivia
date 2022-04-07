import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import time from './time';

const rootReducer = combineReducers({
  player,
  token,
  time,
});

export default rootReducer;
