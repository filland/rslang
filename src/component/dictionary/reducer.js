import { FETCH_WORLD_REQUEST, FETCH_WORLD_SUCCESS, FETCH_WORLD_FAIL } from "./constants";

const initialState = {
  words: null,
  isLoading: false,
};

export function dictionaryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_WORLD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_WORLD_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_WORLD_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
