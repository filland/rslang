import { fetchDictionaryWordsRequest, fetchDictionaryWordsSuccess, fetchDictionaryWordsFail, fetchUserWordsRequest, fetchUserWordsFail, fetchUserWordsSuccess } from './actions';
import authorizedRequest from '../../../common/utils/ApiUtils';
import { getUserId } from '../../../common/utils/UserUtils';

export const fetchDictionaryWords = async (dispatch, difficultyLevel) => {
  try {
    dispatch(fetchDictionaryWordsRequest());

    const group = difficultyLevel;
    const PAGE_NUMBER = 30;

    // refactor ?
    // https://stackoverflow.com/questions/46241827/fetch-api-requesting-multiple-get-requests

    let wordsForGroup = [];

    for (let page = 0; page < PAGE_NUMBER; page += 1) {
      const FETCH_DICTIONARY_WORDS_URL = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
      const words = await authorizedRequest(FETCH_DICTIONARY_WORDS_URL);
      wordsForGroup = wordsForGroup.concat(words);
    }

    dispatch(fetchDictionaryWordsSuccess(wordsForGroup));
  } catch (error) {
    dispatch(fetchDictionaryWordsFail(error));
  }
};

export const fetchUserWords = async (dispatch) => {
  try {
    dispatch(fetchUserWordsRequest());

    const userId = getUserId();
    const USER_WORDS_URL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`;
    const userWords = await authorizedRequest(USER_WORDS_URL);

    dispatch(fetchUserWordsSuccess(userWords));
  } catch (error) {
    dispatch(fetchUserWordsFail(error));
  }
};
