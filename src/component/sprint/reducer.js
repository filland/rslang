import { FETCH_WORD_REQUEST, FETCH_WORD_SUCCESS, FETCH_WORD_FAIL } from './constants';

const initialState = {
  word: null,
  isLoading: false,
};

function sprintReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_WORD_REQUEST:
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_WORD_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_WORD_FAIL:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export default sprintReducer;
