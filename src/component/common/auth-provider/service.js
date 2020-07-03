import { getUserId } from '../../../common/utils/UserUtils';
import authorizedRequest from '../../../common/utils/ApiUtils';
import fetchDictionaryWords from '../word/dictionary-word/service';
import fetchUserWords from '../word/user-word/service';
import { getUserSettings } from '../../settings/service';

export const fetchStatistics = async () => {
  const userId = getUserId();
  const USER_STATISTICS_URL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;

  const statistics = await authorizedRequest(USER_STATISTICS_URL);
  return statistics;
};

export const fetchData = () => async (dispatch) => {
  await dispatch(getUserSettings());

  dispatch(fetchDictionaryWords());

  dispatch(fetchUserWords());

  // await fetchStatistics();
};
