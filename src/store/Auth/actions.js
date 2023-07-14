import { setAccessToken, setLoggedUser } from '../../config/cookies';
/* eslint-disable */
import { authAxios } from '../../config/axios';
import { LOGIN_END_POINT, CHECK_AUTH_END_POINT } from '../../server/end-points';
import * as actionTypes from './types';

export const loginRequest = () => {
  return {
    type: actionTypes.LOGIN_REQUEST,
  };
};
export const loginSuccess = (data) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: data,
  };
};
export const loginFailure = (error) => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: error,
  };
};

export const login = (username, password, onLoginSuccess) => {
  return (dispatch) => {
    dispatch(loginRequest());
    authAxios
      .post(LOGIN_END_POINT, { username, password })
      .then((res) => {
        const data = res.data;
        setAccessToken(data.token);
        setLoggedUser(data.account);
        dispatch(loginSuccess(data));
        onLoginSuccess();
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginFailure(error));
      });
  };
};

export const checkAuthRequest = () => {
  return {
    type: actionTypes.CHECK_AUTH_REQUEST,
  };
};
export const checkAuthSuccess = (data) => {
  return {
    type: actionTypes.CHECK_AUTH_SUCCESS,
    payload: data,
  };
};
export const checkAuthFailure = (error) => {
  return {
    type: actionTypes.CHECK_AUTH_FAILURE,
    payload: error,
  };
};

export const checkAuth = (onCheckAuthFailed) => {
  return (dispatch) => {
    dispatch(checkAuthRequest());
    authAxios
      .get(CHECK_AUTH_END_POINT)
      .then((res) => {
        const data = res.data;

        console.log('check success');
        dispatch(checkAuthSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        onCheckAuthFailed();
        dispatch(checkAuthFailure(error));
      });
  };
};
