import { fetchUserWordsRequest, fetchUserWordsFail, fetchUserWordsSuccess } from './actions';
import authorizedRequest from '../../../../common/utils/ApiUtils';
import { getUserId } from '../../../../common/utils/UserUtils';

const fetchUserWords = () => async (dispatch) => {
  try {
    dispatch(fetchUserWordsRequest());

    const userId = getUserId();
    const USER_WORDS_URL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`;
    const userWords = await authorizedRequest(USER_WORDS_URL);

    const preparedUserWords = [];
    for (let i = 0; i < userWords.length; i += 1) {
      const userWord = userWords[i];
      const FETCH_DICTIONARY_WORD_URL = `https://afternoon-falls-25894.herokuapp.com/words/${userWord.wordId}`;
      const dictionaryWord = await authorizedRequest(FETCH_DICTIONARY_WORD_URL);
      dictionaryWord.userWord = userWord;
      preparedUserWords.push(dictionaryWord);
    }

    dispatch(fetchUserWordsSuccess(preparedUserWords));
  } catch (error) {
    dispatch(fetchUserWordsFail(error));
  }
};

export default fetchUserWords;
