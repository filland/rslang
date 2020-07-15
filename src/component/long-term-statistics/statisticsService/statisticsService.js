import { statisticsRequest, statisticsSuccess, statisticsFail } from '../actions';
import { getUserId } from '../../../common/utils/UserUtils';
import { getJwtToken } from '../../../common/utils/TokenUtils';
import parseStringtoArray from '../helpers';
import { parseArraytoString, transformArray } from './helpers';

const setUserStatistics = (playAllWords, playNewWords) => async (dispatch, getStore) => {
  const store = getStore();
  const newStatistics = transformArray(playAllWords, playNewWords, store);
  const userId = getUserId();
  const token = getJwtToken();
  try {
    dispatch(statisticsRequest());
    const setStatisticsURL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;
    const response = await fetch(setStatisticsURL, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parseArraytoString(newStatistics)),
    });
    const dataString = await response.json();
    const data = parseStringtoArray(dataString);
    dispatch(statisticsSuccess(data));
  } catch (error) {
    dispatch(statisticsFail(error));
  }
};

export const setDefaultUserStatistics = () => async (dispatch) => {
  const userId = getUserId();
  const token = getJwtToken();
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
  try {
    dispatch(statisticsRequest());
    const setStatisticsURL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;
    const response = await fetch(setStatisticsURL, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parseArraytoString(initialState)),
    });
    const dataString = await response.json();
    const data = parseStringtoArray(dataString);
    dispatch(statisticsSuccess(data));
  } catch (error) {
    dispatch(statisticsFail(error));
  }
};

export default setUserStatistics;
