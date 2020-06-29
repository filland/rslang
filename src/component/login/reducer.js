import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from './constants';

const initialState = {
  isLoading: false,
  isError: false,
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        ...action.payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export default loginReducer;
