import {
  CHANGE_CURRENT_WORD,
  START_GAME, CHECK_ANSWER,
  END_GAME, CHANGE_VOLUME,
  SHOW_WORD_DATA,
} from './actions';

const stateDefault = {
  data: [],
  numOfCurrentWord: 0,
  currentLevel: 1,
  currentPage: 1,
  gameWasStarted: false,
  checkingAnswer: false,
  audioOn: true,
  wordDataIsShowing: false,
  lifesCount: 5,
  iKnowArr: [],
  iDontKnowArr: [],
  dataOfClickedWord: {},
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

    case CHANGE_VOLUME:
      return {
        ...state,
        ...action.payload,
      };

    case SHOW_WORD_DATA:
      return {
        ...state,
        ...action.payload,

      };

    default:
      return state;
  }
};

export default savannaReducer;
