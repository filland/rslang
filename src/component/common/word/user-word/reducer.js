import { FETCH_USER_WORD_REQUEST, FETCH_USER_WORD_SUCCESS, FETCH_USER_WORD_FAIL } from './constants';

const initialState = {
  words: [],
  isLoading: false,
  isLoaded: false,
  isError: false,
};

function userWordsReducer(state = initialState, action) {
  switch (action.type) {
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

export default userWordsReducer;
