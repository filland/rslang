import { STATISTICS_REQUEST, STATISTICS_SUCCESS, STATISTICS_FAIL } from './constants';

const currentDay = Date.now();
const millisecondsInDay = 86400000;
const arrayOfDays = [1, 2, 3, 4, 5, 6, 7];

const dayDateList = arrayOfDays
  .map((element, index) => currentDay - millisecondsInDay * index)
  .reverse();

const initialState = {
  learnedWords: 0,
  optional: {
    dayAllWords: [0, 0, 0, 0, 0, 0, 0],
    dayNewWords: [0, 0, 0, 0, 0, 0, 0],
    dayDate: dayDateList,
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
