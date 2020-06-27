import {
  FETCH_DICTIONARY_WORD_REQUEST,
  FETCH_DICTIONARY_WORD_SUCCESS,
  FETCH_DICTIONARY_WORD_FAIL,
  FETCH_USER_WORD_SUCCESS,
  FETCH_USER_WORD_REQUEST,
  FETCH_USER_WORD_FAIL,
} from './constants';

export function fetchDictionaryWordsRequest() {
  return {
    type: FETCH_DICTIONARY_WORD_REQUEST,
    payload: {
      isDictionaryWordsLoading: true,
      isDictionaryWordsError: false,
    },
  };
}

export function fetchDictionaryWordsSuccess(dictionaryWords) {
  return {
    type: FETCH_DICTIONARY_WORD_SUCCESS,
    payload: {
      isDictionaryWordsLoading: false,
      dictionaryWords,
    },
  };
}

export function fetchDictionaryWordsFail(error) {
  return {
    type: FETCH_DICTIONARY_WORD_FAIL,
    payload: {
      isDictionaryWordsLoading: false,
      isDictionaryWordsError: true,
      error,
    },
  };
}

export function fetchUserWordsRequest() {
  return {
    type: FETCH_USER_WORD_REQUEST,
    payload: {
      isUserWordsLoading: true,
      isUserWordsError: false,
    },
  };
}

export function fetchUserWordsSuccess(userWords) {
  return {
    type: FETCH_USER_WORD_SUCCESS,
    payload: {
      isUserWordsLoading: false,
      userWords,
    },
  };
}

export function fetchUserWordsFail(error) {
  return {
    type: FETCH_USER_WORD_FAIL,
    payload: {
      isUserWordsLoading: false,
      isUserWordsError: true,
      error,
    },
  };
}
