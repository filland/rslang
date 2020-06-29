import { FETCH_WORD_REQUEST, FETCH_WORD_SUCCESS, FETCH_WORD_FAIL } from './constants';

const initialState = {
  words: [],
  wordCount: 0,
  wordCountToday: 0,

  wordsDifficult: [],
  wordDifficultCount: 0,
  wordDifficultCountToday: 0,

  wordsDeleted: [],
  wordDeletedCount: 0,
  wordDeletedCountToday: 0,

  isLoading: false,

};

function dictionaryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_WORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_WORD_SUCCESS:
      return {
        ...state,
        ...action.payload,

      };

    case FETCH_WORD_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

export default dictionaryReducer;
