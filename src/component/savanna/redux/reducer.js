import { GET_DATA_WITH_WORDS } from './actions';

const stateDefault = {
  data: [],
};

const savannaReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_DATA_WITH_WORDS:
      return {
        ...state,
        ...action.payload,

      };

    default:
      return state;
  }
};

export default savannaReducer;
