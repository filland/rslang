import { fetchUserWordsRequest, fetchUserWordsFail, fetchUserWordsSuccess } from './actions';
import authorizedRequest from '../../../../common/utils/ApiUtils';
import { getUserId } from '../../../../common/utils/UserUtils';
import { transformNewWordsArrayToCorrectType, transformOldWordsArrayToCorrectType } from '../../../../common/helper/helpers';

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
      const dictionaryWord = authorizedRequest(FETCH_DICTIONARY_WORD_URL);
      preparedUserWords.push(dictionaryWord);
    }
    const dictionaryUserWords = await Promise.all(preparedUserWords);
    for (let i = 0; i < dictionaryUserWords.length; i += 1) {
      dictionaryUserWords[i].userWord = userWords[i];
    }
    console.log(dictionaryUserWords);

    dispatch(fetchUserWordsSuccess(dictionaryUserWords));
  } catch (error) {
    console.log(error);
    dispatch(fetchUserWordsFail(error));
  }
};

export const updateOldUserWords = (oldWords) => async (dispatch, getStore) => {
  const store = getStore();
  const arrayOfUserWords = store.userWords.words;
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
    for (let i = 0; i < arrayOfUserWords.length; i += 1) {
      for (let k = 0; k < data.length; k += 1) {
        if (arrayOfUserWords[i].userWord.wordId === data[k].wordId) {
          arrayOfUserWords[i].userWord = data[k];
        }
      }
    }

    console.log(arrayOfUserWords);
    dispatch(fetchUserWordsSuccess(arrayOfUserWords));
  } catch (error) {
    console.log(error);
    dispatch(fetchUserWordsFail(error));
  }
};

export const postNewUserWords = (newWords) => async (dispatch, getStore) => {
  const store = getStore();
  const arrayOfUserWords = store.userWords.words;
  const dictionaryWords = store.dictionaryWords.words;
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
    const renewUserWords = [];
    for (let i = 0; i < dictionaryWords.length; i += 1) {
      for (let k = 0; k < data.length; k += 1) {
        if (dictionaryWords[i].id === data[k].wordId) {
          dictionaryWords[i].userWord = data[k];
          renewUserWords.push(dictionaryWords[i]);
        }
      }
    }
    const result = renewUserWords.concat(arrayOfUserWords);
    dispatch(fetchUserWordsSuccess(result));
  } catch (error) {
    dispatch(fetchUserWordsFail(error));
  }
};

export default fetchUserWords;
