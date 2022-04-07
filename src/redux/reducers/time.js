import { EXPIRED_TIME } from '../actions/actionTypes';

const INITIAL_STATE = {
  time: false,
};

const time = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EXPIRED_TIME:
    return {
      ...state,
      time: true,
    };
  default:
    return state;
  }
};

export default time;
