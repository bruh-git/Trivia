import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import time from './time';
import config from './config';

const rootReducer = combineReducers({
  player,
  token,
  time,
  config,
});

export default rootReducer;
