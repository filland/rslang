import { fetchUserWordsRequest, fetchUserWordsFail, fetchUserWordsSuccess } from './actions';
import authorizedRequest from '../../../../common/utils/ApiUtils';
import { getUserId } from '../../../../common/utils/UserUtils';
import { transformOldWordsArrayToCorrectType, transformNewWordsArrayToCorrectType } from '../../../../common/helper/helpers';

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
  const transformOldWords = transformOldWordsArrayToCorrectType(oldWords);
  try {
    dispatch(fetchUserWordsRequest());
    const userId = getUserId();
    const data = [];
    for (let i = 0; i < transformOldWords.length; i += 1) {
      const oldWord = oldWords[i];
      const transformOldWord = transformOldWords[i];
      const OLD_USER_WORDS_URL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${oldWord.id}`;
      const body = JSON.stringify(transformOldWord);
      const dataItem = await authorizedRequest(OLD_USER_WORDS_URL, 'PUT', body);
      data.push(dataItem);
    }
    dispatch(fetchUserWordsSuccess(data));
  } catch (error) {
    dispatch(fetchUserWordsFail(error));
  }
};

export const postNewUserWords = (newWords) => async (dispatch) => {
  const transformNewWords = transformNewWordsArrayToCorrectType(newWords);
  try {
    dispatch(fetchUserWordsRequest());
    const userId = getUserId();
    const data = [];
    for (let i = 0; i < transformNewWords.length; i += 1) {
      const newWord = newWords[i];

      const transformNewWord = transformNewWords[i];
      const NEW_USER_WORDS_URL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${newWord.id}`;
      const body = JSON.stringify(transformNewWord);
      const dataItem = await authorizedRequest(NEW_USER_WORDS_URL, 'POST', body);
      data.push(dataItem);
    }
    dispatch(fetchUserWordsSuccess(data));
  } catch (error) {
    dispatch(fetchUserWordsFail(error));
  }
};

export const updateUserWords = (userWords) => async (dispatch) => {
  try {
    dispatch(fetchUserWordsRequest());
    const userId = getUserId();
    const data = [];
    for (let i = 0; i < userWords.length; i += 1) {
      const userWord = userWords[i];
      const OLD_USER_WORDS_URL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${userWord.wordId}`;
      const body = JSON.stringify(userWords);
      const dataItem = await authorizedRequest(OLD_USER_WORDS_URL, 'PUT', body);
      data.push(dataItem);
    }
    dispatch(fetchUserWordsSuccess(data));
    dispatch(fetchUserWords());
  } catch (error) {
    dispatch(fetchUserWordsFail(error));
  }
};

export default fetchUserWords;
