import { fetchUserWordsRequest, fetchUserWordsFail, fetchUserWordsSuccess } from './actions';
import authorizedRequest from '../../../../common/utils/ApiUtils';
import { getUserId } from '../../../../common/utils/UserUtils';
import { transformNewWordsArrayToCorrectType } from '../../../../common/helper/helpers';

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

export const updateOldUserWords = (oldWords) => async (dispatch, getStore) => {
  const store = getStore();
  const arrayOfUserWords = store.userWords.words;
  const arrayOfUserWordFields = [];
  arrayOfUserWords.forEach((el) => {
    arrayOfUserWordFields.push(el.userWord);
  });
  try {
    dispatch(fetchUserWordsRequest());
    const userId = getUserId();
    const data = [];
    for (let i = 0; i < oldWords.length; i += 1) {
      const oldWord = oldWords[i];
      const OLD_USER_WORDS_URL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${oldWord.wordId}`;
      const body = JSON.stringify(oldWords);
      const dataItem = await authorizedRequest(OLD_USER_WORDS_URL, 'PUT', body);
      data.push(dataItem);
    }
    for (let i = 0; i < arrayOfUserWordFields.length; i += 1) {
      for (let k = 0; k < data.length; k += 1) {
        if (arrayOfUserWordFields[i].wordId === data[k].wordId) {
          arrayOfUserWordFields[i] = data[k];
        }
      }
    }
    dispatch(fetchUserWordsSuccess(data));
  } catch (error) {
    dispatch(fetchUserWordsFail(error));
  }
};

export const postNewUserWords = (newWords) => async (dispatch, getStore) => {
  const store = getStore();
  const arrayOfUserWords = store.userWords.words;
  const arrayOfUserWordFields = [];
  arrayOfUserWords.forEach((el) => {
    arrayOfUserWordFields.push(el.userWord);
  });
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
    const result = data.concat(arrayOfUserWordFields);
    dispatch(fetchUserWordsSuccess(result));
  } catch (error) {
    dispatch(fetchUserWordsFail(error));
  }
};

export default fetchUserWords;
