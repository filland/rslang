import {
  FETCH_WORD_REQUEST,
  FETCH_WORD_SUCCESS,
  FETCH_WORD_FAIL,
} from './constants';

export function fetchWordRequest() {
  return {
    type: FETCH_WORD_REQUEST,
    payload: {
      isLoading: true,
    },
  };
}

export function fetchWordSuccess(word) {
  return {
    type: FETCH_WORD_SUCCESS,
    payload: {
      isLoading: false,
      word,
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
