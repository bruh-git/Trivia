import { SAVE_CONFIG, RESET_STATE } from '../actions/actionTypes';

const INITIAL_STATE = { amount: 5 };

const config = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CONFIG:
    return action.config;
  case RESET_STATE:
    return {};
  default:
    return state;
  }
};

export default config;
