import {
  USER_LOGIN_DATA,
  UPDATE_ASSERTIONS,
  UPDATE_SCORE,
  SAVE_GRAVATAR,
  RESET_STATE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  picture: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN_DATA:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case UPDATE_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  case SAVE_GRAVATAR:
    return {
      ...state,
      picture: action.picture,
    };
  case RESET_STATE:
    return {
      ...state,
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
      picture: '',
    };
  default:
    return state;
  }
};

export default player;
