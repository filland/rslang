import { REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_FAIL } from './constants';

const initialState = {
  isLoading: false,
  isError: false,
  isLoaded: false,
};

function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return {
        ...state,
        ...action.payload,
      };

    case REGISTRATION_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case REGISTRATION_FAIL:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export default registrationReducer;
