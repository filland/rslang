import {
  CHANGE_CURRENT_WORD, START_GAME, CHECK_ANSWER, END_GAME,
} from './actions';

const stateDefault = {
  data: [],
  numOfCurrentWord: 0,
  currentLevel: 1,
  currentPage: 1,
  gameWasStarted: false,
  lifesCount: 5,
  iKnowArr: [],
  iDontKnowArr: [],
};

const savannaReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_WORD:
      return {
        ...state,
        ...action.payload,

      };

    case START_GAME:
      return {
        ...state,
        ...action.payload,

      };

    case CHECK_ANSWER:
      return {
        ...state,
        ...action.payload,

      };

    case END_GAME:
      return {
        ...state,
        ...action.payload,

      };

    default:
      return state;
  }
};

export default savannaReducer;
