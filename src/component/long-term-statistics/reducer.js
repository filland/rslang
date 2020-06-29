import { STATISTICS_REQUEST, STATISTICS_SUCCESS, STATISTICS_FAIL } from './constants';

const currentDay = Date.now();
const millisecondsInDay = 86400000;

const initialState = {
  learnedWords: 0,
  optional: {
    day1AllWords: 0,
    day1NewWords: 0,
    day1Date: currentDay - millisecondsInDay * 6,
    day2AllWords: 0,
    day2NewWords: 0,
    day2Date: currentDay - millisecondsInDay * 5,
    day3AllWords: 0,
    day3NewWords: 0,
    day3Date: currentDay - millisecondsInDay * 4,
    day4AllWords: 0,
    day4NewWords: 0,
    day4Date: currentDay - millisecondsInDay * 3,
    day5AllWords: 0,
    day5NewWords: 0,
    day5Date: currentDay - millisecondsInDay * 2,
    day6AllWords: 0,
    day6NewWords: 0,
    day6Date: currentDay - millisecondsInDay,
    day7AllWords: 0,
    day7NewWords: 0,
    day7Date: currentDay,
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
