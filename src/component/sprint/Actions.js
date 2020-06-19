import {
  FETCH_WORD_SUCCESS,
  FETCH_WORD_FAIL,
} from "./Constants";

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
