import { getUserId } from '../../../common/utils/UserUtils';
import authorizedRequest from '../../../common/utils/ApiUtils';
import fetchDictionaryWords from '../word/dictionary-word/service';
import fetchUserWords from '../word/user-word/service';
import { getUserSettings } from '../../settings/service';
import getUserStatistics from '../../long-term-statistics/service';

export const fetchData = () => async (dispatch, getState) => {
  const store = getState();

  await getUserSettings(dispatch);

  await fetchDictionaryWords(dispatch, store);

  await fetchUserWords(dispatch);

  await getUserStatistics(dispatch);
};
