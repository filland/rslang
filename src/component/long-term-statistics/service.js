import { statisticsRequest, statisticsSuccess, statisticsFail } from './actions';
import { getUserId } from '../../common/utils/UserUtils';
import { getJwtToken } from '../../common/utils/TokenUtils';
import parseStringtoArray from './helpers';

const getUserStatistics = () => async (dispatch) => {
  const userId = getUserId();
  const token = getJwtToken();
  try {
    dispatch(statisticsRequest());
    const getStatisticsURL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;
    const response = await fetch(getStatisticsURL, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const dataString = await response.json();
    const data = parseStringtoArray(dataString);
    dispatch(statisticsSuccess(data));
  } catch (error) {
    dispatch(statisticsFail(error));
  }
};

export default getUserStatistics;
