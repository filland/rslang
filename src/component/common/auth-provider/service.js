import { getUserId } from '../../../common/utils/UserUtils';
import authorizedRequest from '../../../common/utils/ApiUtils';
import fetchDictionaryWords from '../word/dictionary-word/service';
import fetchUserWords from '../word/user-word/service';

export const fetchSettings = async () => {
  const userId = getUserId();
  const USER_SETTINGS_URL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`;
  const settings = await authorizedRequest(USER_SETTINGS_URL);
  return settings;
};

export const fetchStatistics = async () => {
  const userId = getUserId();
  const USER_STATISTICS_URL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;

  const statistics = await authorizedRequest(USER_STATISTICS_URL);
  return statistics;
};

export const fetchData = () => async (dispatch) => {
  // await fetchSettings();

  // difficulty level should be taken form settings
  const difficultyLevel = 1;

  await fetchDictionaryWords(dispatch, difficultyLevel);

  await fetchUserWords(dispatch);

  // await fetchStatistics();
};
