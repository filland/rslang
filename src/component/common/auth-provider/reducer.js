import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAIL } from './constants';

const initialState = {
  isLoading: false,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        ...action.payload,
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case AUTH_FAIL:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export default authReducer;
