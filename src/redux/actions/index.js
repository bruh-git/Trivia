import fetchAPI from '../../services/fetchApi';
import {
  RECEIVE_TOKEN_SUCCESS,
  RECEIVE_TOKEN_FAILURE,
  REQUEST_TOKEN,
  USER_LOGIN_DATA,
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

export const userLoginData = (name, email) => ({
  type: USER_LOGIN_DATA,
  email,
  name,
});

const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const fetchTokenThunk = () => async (dispatch) => {
  dispatch(requestToken());
  try {
    const json = await fetchAPI(URL_TOKEN);
    dispatch(receiveTokenSuccess(json.token));
  } catch (error) {
    dispatch(receiveTokenFailure());
  }
};
