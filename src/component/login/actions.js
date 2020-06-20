import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from './constants';

export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
    payload: {
      isLoading: true,
      isError: false,
    },
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      isLoading: false,
    },
  };
}

export function loginFail(error) {
  return {
    type: LOGIN_FAIL,
    payload: {
      isLoading: false,
      isError: true,
      error,
    },
  };
}
