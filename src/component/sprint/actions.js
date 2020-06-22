import {
  FETCH_SPRINT_REQUEST,
  FETCH_SPRINT_SUCCESS,
  FETCH_SPRINT_FAIL,
} from './constants';

export function fetchSprintRequest() {
  return {
    type: FETCH_SPRINT_REQUEST,
    payload: {
      isLoading: true,
    },
  };
}

export function fetchSprintSuccess(word, translation, randomIndex, randomIndex2, id) {
  return {
    type: FETCH_SPRINT_SUCCESS,
    payload: {
      isLoading: false,
      word,
      translation,
      randomIndex,
      randomIndex2,
      id,
    },
  };
}

export function fetchSprintFail() {
  return {
    type: FETCH_SPRINT_FAIL,
    payload: {
      isLoading: false,
    },
  };
}
