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

export const USER_LOGIN_DATA = 'USER_LOGIN_DATA';

export const RENEW_TOKEN = 'RENEW_TOKEN';

export const EXPIRED_TIME = 'EXPIRED_TIME';

export const UPDATE_ASSERTIONS = 'UPDATE_ASSERTIONS';

export const UPDATE_SCORE = 'UPDATE_SCORE';

export const RESET_TIME = 'RESET_TIME';

export const SAVE_GRAVATAR = 'SAVE_GRAVATAR';

export const RESET_STATE = 'RESET_STATE';
