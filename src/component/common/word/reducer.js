import { FETCH_DICTIONARY_WORD_REQUEST, FETCH_DICTIONARY_WORD_SUCCESS, FETCH_DICTIONARY_WORD_FAIL, FETCH_USER_WORD_REQUEST, FETCH_USER_WORD_SUCCESS, FETCH_USER_WORD_FAIL } from './constants';

const initialState = {
  dictionaryWords: [],
  isDictionaryWordsLoading: false,
  isDictionaryWordsError: false,
  userWords: [],
  isUserWordsLoading: false,
  isUserWordsError: false,
};

function wordsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DICTIONARY_WORD_REQUEST:
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_DICTIONARY_WORD_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_DICTIONARY_WORD_FAIL:
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_USER_WORD_REQUEST:
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_USER_WORD_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_USER_WORD_FAIL:
      return {
        ...state,
        ...action.payload,
      };


    default:
      return state;
  }
}

export default wordsReducer;
