import { USER_LOGIN_DATA, UPDATE_SCORE } from '../actions/actionTypes';

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
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
};

export default player;
