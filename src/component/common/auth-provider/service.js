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

export const fetchData = () => async (dispatch, getState) => {
  const store = getState();

  await getUserSettings(dispatch);

  await fetchDictionaryWords(dispatch, store);

  await fetchUserWords(dispatch);

  // await fetchStatistics();
};
