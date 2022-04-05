import fetchAPI from '../../services/fetchApi';
import { RECEIVE_TOKEN_SUCCESS,
  RECEIVE_TOKEN_FAILURE, REQUEST_TOKEN } from './actionTypes';

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

const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const fetchTokenThunk = () => async (dispatch) => {
  dispatch(requestToken());
  try {
    const json = await fetchAPI(URL_TOKEN);
    dispatch(receiveTokenSuccess(json));
  } catch (error) {
    dispatch(receiveTokenFailure());
  }
};
