import { authRequest, authSuccess, authFail } from './actions';
import { getUserId } from '../../../common/utils/UserUtils';
import { getJwtToken } from '../../../common/utils/TokenUtils';

async function authorizedRequest(url, method = 'GET', body) {
  const jwtToken = getJwtToken();
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
    body,
  });
  const parsedResponse = await response.json();
  return parsedResponse;
}

export const fetchSettings = async () => {
  const userId = getUserId();
  const USER_SETTINGS_URL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`;
  const settings = await authorizedRequest(USER_SETTINGS_URL);
  return settings;
};

export const fetchDictionaryWords = async (difficultyLevel) => {
  const group = difficultyLevel;
  const pagesNumber = 30;

  // refactor ?
  // https://stackoverflow.com/questions/46241827/fetch-api-requesting-multiple-get-requests

  let wordsForGroup = [];

  for (let page = 0; page < pagesNumber; page += 1) {
    const FETCH_DICTIONARY_WORDS_URL = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const words = await authorizedRequest(FETCH_DICTIONARY_WORDS_URL);
    wordsForGroup = wordsForGroup.concat(words);
  }
  return wordsForGroup;
};

export const fetchUserWords = async () => {
  const userId = getUserId();
  const USER_WORDS_URL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`;

  const userWords = await authorizedRequest(USER_WORDS_URL);
  return userWords;
};

export const fetchStatistics = async () => {
  const userId = getUserId();
  const USER_STATISTICS_URL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;

  const statistics = await authorizedRequest(USER_STATISTICS_URL);
  return statistics;
};

export const fetchData = () => async (dispatch) => {
  try {
    dispatch(authRequest());

    const settings = await fetchSettings();
    // difficulty level should be taken form settings
    const difficultyLevel = 1;

    const dictionaryWords = await fetchDictionaryWords(difficultyLevel);

    const userWords = await fetchUserWords();

    const statistics = await fetchStatistics();

    const data = {
      settings, dictionaryWords, userWords, statistics,
    };

    dispatch(authSuccess(data));
  } catch (error) {
    dispatch(authFail(error));
  }
};
