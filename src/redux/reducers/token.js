// Iniciando a branch da tela de jogo
import { RECEIVE_TOKEN_FAILURE, RECEIVE_TOKEN_SUCCESS,
  REQUEST_TOKEN, RENEW_TOKEN } from '../actions/actionTypes';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return (state);
  case RECEIVE_TOKEN_SUCCESS:
    return (action.token);
  case RECEIVE_TOKEN_FAILURE:
    return (action.error);
  case RENEW_TOKEN:
    return (action.token);
  default:
    return state;
  }
};

export default token;
