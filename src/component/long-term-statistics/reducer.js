import { STATISTICS_REQUEST, STATISTICS_SUCCESS, STATISTICS_FAIL } from './constants';

const currentDay = Date.now();
const millisecondsInDay = 86400000;

const initialState = {
  learnedWords: 0,
  optional: {
    dayAllWords: [0, 0, 0, 0, 0, 0, 0],
    dayNewWords: [0, 0, 0, 0, 0, 0, 0],
    dayDate: [
      currentDay - millisecondsInDay * 6,
      currentDay - millisecondsInDay * 5,
      currentDay - millisecondsInDay * 4,
      currentDay - millisecondsInDay * 3,
      currentDay - millisecondsInDay * 2,
      currentDay - millisecondsInDay,
      currentDay,
    ],
    newWords: 0,
    oldWords: 0,
  },
  isLoading: false,
};

function statisticsReducer(state = initialState, action) {
  switch (action.type) {
    case STATISTICS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };

    case STATISTICS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case STATISTICS_FAIL:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export default statisticsReducer;
