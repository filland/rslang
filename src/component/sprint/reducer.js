import { FETCH_SPRINT_REQUEST, FETCH_SPRINT_SUCCESS, FETCH_SPRINT_FAIL } from './constants';

const initialState = {
  word: null,
  isLoading: false,
};

function sprintReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SPRINT_REQUEST:
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_SPRINT_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_SPRINT_FAIL:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export default sprintReducer;
