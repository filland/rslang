import {
  CHANGE_CURRENT_WORD,
  START_GAME, CHECK_ANSWER,
  END_GAME, CHANGE_VOLUME,
  SHOW_WORD_DATA, CHANGE_TIMER,
  TIMER_OFF, ANIMATION, TIME_IS_OVER,
} from './actions';

const stateDefault = {
  data: [],
  numOfCurrentWord: 0,
  gameWasStarted: false,
  checkingAnswer: false,
  audioOn: true,
  wordDataIsShowing: false,
  lifesCount: 5,
  iKnowArr: [],
  iDontKnowArr: [],
  dataOfClickedWord: {},
  timerIsOff: false,
  seconds: 3,
  isAnimate: false,
  isWaitingAnswer: true,
  timeIsOn: false,
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

    case CHANGE_TIMER:
      return {
        ...state,
        ...action.payload,

      };

    case TIMER_OFF:
      return {
        ...state,
        ...action.payload,

      };

    case ANIMATION:
      return {
        ...state,
        ...action.payload,

      };

    case TIME_IS_OVER:
      return {
        ...state,
        ...action.payload,

      };

    default:
      return state;
  }
};

export default savannaReducer;
