import {
  FETCH_WORD_REQUEST,
  FETCH_WORD_SUCCESS,
  FETCH_WORD_FAIL,
} from './constants';

export function fetchWordRequest(user) {
  return {
    type: FETCH_WORD_REQUEST,
    payload: {
      isLoading: true,
      user,
    },
  };
}

export function fetchWordSuccess(words) {
  return {
    type: FETCH_WORD_SUCCESS,
    payload: {
      isLoading: false,
      words,
    },
  };
}

export function fetchWordFail() {
  return {
    type: FETCH_WORD_FAIL,
    payload: {
      isLoading: false,
    },
  };
}
