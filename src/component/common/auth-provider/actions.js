import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
} from './constants';

export function authRequest() {
  return {
    type: AUTH_REQUEST,
    payload: {
      isLoading: true,
      isError: false,
    },
  };
}

export function authSuccess(data) {
  return {
    type: AUTH_SUCCESS,
    payload: {
      isLoading: false,
      data,
    },
  };
}

export function authFail(error) {
  return {
    type: AUTH_FAIL,
    payload: {
      isLoading: false,
      isError: true,
      error,
    },
  };
}
