import { REQUEST_QUIZ } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  picture: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUIZ:
    return {
      ...state,

    };
  default:
    return state;
  }
};

export default player;
