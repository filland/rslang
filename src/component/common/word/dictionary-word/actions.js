import {
  FETCH_DICTIONARY_WORD_REQUEST,
  FETCH_DICTIONARY_WORD_SUCCESS,
  FETCH_DICTIONARY_WORD_FAIL,
} from './constants';

export function fetchDictionaryWordsRequest() {
  return {
    type: FETCH_DICTIONARY_WORD_REQUEST,
    payload: {
      isLoading: true,
      isLoaded: false,
      isError: false,
    },
  };
}

export function fetchDictionaryWordsSuccess(words) {
  return {
    type: FETCH_DICTIONARY_WORD_SUCCESS,
    payload: {
      isLoading: false,
      isLoaded: true,
      words,
    },
  };
}

export function fetchDictionaryWordsFail(error) {
  return {
    type: FETCH_DICTIONARY_WORD_FAIL,
    payload: {
      isLoading: false,
      isError: true,
      error,
    },
  };
}
