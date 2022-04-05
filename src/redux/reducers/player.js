import { REQUEST_QUIZ } from '../actions/actionTypes';

const INITIAL_STATE = {};

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
