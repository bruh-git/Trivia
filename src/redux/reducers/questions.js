import { RECEIVE_QUIZ_SUCCESS,
  RECEIVE_QUIZ_FAILURE,
  REQUEST_QUIZ } from '../actions/actionTypes';

const INITIAL_STATE = {
  responseCode: '',
  results: '',
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUIZ:
    return {
      ...state,
    };
  case RECEIVE_QUIZ_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  case RECEIVE_QUIZ_SUCCESS:
    return {
      ...state,
      responseCode: action.quiz.response_code,
      results: action.quiz.results,
    };
  default:
    return state;
  }
};

export default questions;
