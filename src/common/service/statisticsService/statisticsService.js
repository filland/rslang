import { statisticsRequest, statisticsSuccess, statisticsFail } from '../../../component/long-term-statistics/actions';
import { getUserId } from '../../utils/UserUtils';
import { getJwtToken } from '../../utils/TokenUtils';
import parseStringtoArray from '../../../component/long-term-statistics/helpers';
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

export default setUserStatistics;
