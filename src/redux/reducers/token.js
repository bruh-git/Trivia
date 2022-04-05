import { RECEIVE_TOKEN_FAILURE, RECEIVE_TOKEN_SUCCESS,
  REQUEST_TOKEN } from '../actions/actionTypes';

const INITIAL_STATE = {};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
    };
  case RECEIVE_TOKEN_SUCCESS:
    return (action.token);
  case RECEIVE_TOKEN_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default token;
