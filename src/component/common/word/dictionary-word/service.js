import { fetchDictionaryWordsRequest, fetchDictionaryWordsSuccess, fetchDictionaryWordsFail } from './actions';
import authorizedRequest from '../../../../common/utils/ApiUtils';

const fetchDictionaryWords = () => async (dispatch, getState) => {
  try {
    const store = getState();
    dispatch(fetchDictionaryWordsRequest());

    const { difficultyLevel } = store.settings.optional;
    const group = difficultyLevel - 1;
    const PAGE_NUMBER = 30;

    // refactor ?
    // https://stackoverflow.com/questions/46241827/fetch-api-requesting-multiple-get-requests

    const wordsForGroup = [];

    for (let page = 0; page < PAGE_NUMBER; page += 1) {
      const FETCH_DICTIONARY_WORDS_URL = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
      const words = authorizedRequest(FETCH_DICTIONARY_WORDS_URL);
      wordsForGroup.push(words);
    }
    const resolvedPromise = await Promise.all(wordsForGroup);
    const preparedArrayOfWords = resolvedPromise.flat();
    dispatch(fetchDictionaryWordsSuccess(preparedArrayOfWords));
  } catch (error) {
    dispatch(fetchDictionaryWordsFail(error));
  }
};

export default fetchDictionaryWords;
