import { ADD_WORDS } from '../../constants';

const initialState = {
  knowArray: [],
  mistakesArray: [],
};

export default function sprintReducer(state = initialState, action) {
  if (action.type === ADD_WORDS) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}
