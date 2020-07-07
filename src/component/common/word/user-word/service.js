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

export const putOldUserWords = (oldWords) => async (dispatch) => {
  try {
    dispatch(fetchUserWordsRequest());
    const userId = getUserId();

    const USER_WORDS_URL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/`;
    const body = JSON.stringify(oldWords);
    const data = await authorizedRequest(USER_WORDS_URL, 'PUT', body);

    console.log('data PUT: ', data);
    dispatch(fetchUserWordsSuccess(data));
  } catch (error) {
    dispatch(fetchUserWordsFail(error));
  }
};

export const postNewUserWords = (newWords) => async (dispatch) => {
  try {
    dispatch(fetchUserWordsRequest());
    const userId = getUserId();
    let data;
    for (let i = 0; i < newWords.length; i += 1) {
      const newWord = newWords[i];
      const NEW_USER_WORDS_URL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${newWord.id}`;
      console.log('NEW_USER_WORDS_URL : ', NEW_USER_WORDS_URL);
      const body = JSON.stringify(newWord);
      console.log('body: ', body);
      data = await authorizedRequest(NEW_USER_WORDS_URL, 'POST', body);
    }
    console.log('data POST: ', data);
    dispatch(fetchUserWordsSuccess(data));
  } catch (error) {
    dispatch(fetchUserWordsFail(error));
  }
};

export default fetchUserWords;
