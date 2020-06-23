import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
} from './constants';

export function registrationRequest() {
  return {
    type: REGISTRATION_REQUEST,
    payload: {
      isLoading: true,
      isError: false,
      isLoaded: false,
    },
  };
}

export function registrationSuccess() {
  return {
    type: REGISTRATION_SUCCESS,
    payload: {
      isLoading: false,
      isLoaded: true,
    },
  };
}

export function registrationFail(error) {
  return {
    type: REGISTRATION_FAIL,
    payload: {
      isLoading: false,
      isError: true,
      isLoaded: false,
      error,
    },
  };
}
