import {
  FETCH_WORLD_REQUEST,
  FETCH_WORLD_SUCCESS,
  FETCH_WORLD_FAIL,
} from './constants';

export function fetchWorldRequest(user) {
  return {
    type: FETCH_WORLD_REQUEST,
    payload: {
      isLoading: true,
      user,
    },
  };
}

export function fetchWorldSuccess(words) {
  return {
    type: FETCH_WORLD_SUCCESS,
    payload: {
      isLoading: false,
      words,
    },
  };
}

export function fetchWorldFail() {
  return {
    type: FETCH_WORLD_FAIL,
    payload: {
      isLoading: false,
    },
  };
}
