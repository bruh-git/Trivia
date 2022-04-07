import fetchAPI from '../../services/fetchApi';
import store from '../store';

import {
  RECEIVE_TOKEN_SUCCESS,
  RECEIVE_TOKEN_FAILURE,
  REQUEST_TOKEN,
  RENEW_TOKEN,
  RECEIVE_QUIZ_SUCCESS,
  RECEIVE_QUIZ_FAILURE,
  REQUEST_QUIZ,
  USER_LOGIN_DATA,
  EXPIRED_TIME,
  UPDATE_SCORE,
} from './actionTypes';

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const receiveTokenSuccess = (token) => ({
  type: RECEIVE_TOKEN_SUCCESS,
  token,
});

export const receiveTokenFailure = (error) => ({
  type: RECEIVE_TOKEN_FAILURE,
  error,
});

export const renewToken = (token) => ({
  type: RENEW_TOKEN,
  token,
});

export const requestQuiz = () => ({
  type: REQUEST_QUIZ,
});

export const receiveQuizSuccess = (quiz) => ({
  type: RECEIVE_QUIZ_SUCCESS,
  quiz,
});

export const receiveQuizFailure = (error) => ({
  type: RECEIVE_QUIZ_FAILURE,
  error,
});

export const userLoginData = (name, email) => ({
  type: USER_LOGIN_DATA,
  email,
  name,
});

export const expiredTimeAction = () => ({ type: EXPIRED_TIME });

export const updateScore = (score) => ({ type: UPDATE_SCORE, score });

const { token } = store.getState();
const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
const URL_QUIZ = `https://opentdb.com/api.php?amount=5&token=${token}`;

export const fetchTokenThunk = () => async (dispatch) => {
  dispatch(requestToken());
  try {
    const json = await fetchAPI(URL_TOKEN);
    dispatch(receiveTokenSuccess(json.token));
  } catch (error) {
    dispatch(receiveTokenFailure());
  }
};

export const fetchQuizThunk = () => async (dispatch) => {
  dispatch(requestQuiz());
  try {
    const json = await fetchAPI(URL_QUIZ);
    dispatch(receiveQuizSuccess(json));
  } catch (error) {
    dispatch(receiveQuizFailure());
  }
};
