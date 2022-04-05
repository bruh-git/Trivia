export const INITIAL_STATE = {
  token: '',
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
    picture: '',
  },
  ranking: [],
};

export const REQUEST_TOKEN = 'REQUEST_TOKEN';

export const RECEIVE_TOKEN_SUCCESS = 'RECEIVE_TOKEN_SUCCESS';

export const RECEIVE_TOKEN_FAILURE = 'RECEIVE_TOKEN_FAILURE';

export const REQUEST_QUIZ = 'REQUEST_QUIZ';

export const RECEIVE_QUIZ_SUCCESS = 'RECEIVE_QUIZ_SUCCESS';

export const RECEIVE_QUIZ_FAILURE = 'RECEIVE_QUIZ_FAILURE';
