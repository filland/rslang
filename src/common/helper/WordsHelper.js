/* eslint-disable max-len */
import getUserWords from '../../component/common/word/user-word/selectors';
import getDictionaryWords from '../../component/common/word/dictionary-word/selectors';
import { updateOldUserWords, postNewUserWords } from '../../component/common/word/user-word/service';

function getRandomIndex(upperBorder) {
  return Math.round(Math.random() * upperBorder);
}

/**
 * Checks if the dictionary word was already added to user's dictionary
 */
function isUserWord(dictionaryWord, userWords) {
  return userWords.find((word) => word.userWord.wordId === dictionaryWord.id) !== undefined;
}
/**
 * This function creates an array of randomly selected dictionary words of the
 * specified length @param numberOfDictionaryWords which were not added to user words yet
 */
function prepareDictionaryWords(userWords, dictionaryWords, numberOfDictionaryWords) {
  const dictionaryWordsArray = [];

  // this number is used to avoid infinite loop
  const MAX_ITERATION_NUMBER = 1000;
  let counter = 0;
  while (dictionaryWordsArray.length !== numberOfDictionaryWords) {
    if (counter > MAX_ITERATION_NUMBER) {
      break;
    }
    const dictionaryWordIndex = getRandomIndex(dictionaryWords.length - 1);
    const dictionaryWord = dictionaryWords[dictionaryWordIndex];

    if (!isUserWord(dictionaryWord, userWords) && !dictionaryWordsArray.includes(dictionaryWord)) {
      dictionaryWordsArray.push(dictionaryWord);
    }
    counter += 1;
  }

  return dictionaryWordsArray;
}

/**
 * Shuffle elements of the provided @param array
 */
const shuffleArray = (array) => {
  array.sort(() => Math.random() - 0.5);
};

function getNumberOfShownWordsToday(dayNewWords, daysDates) {
  if (dayNewWords && daysDates) {
    const latestDateMills = daysDates[6];
    const latestDate = new Date(latestDateMills);
    const currentDate = new Date();
    if (latestDate.toLocaleDateString() === currentDate.toLocaleDateString()) {
      const number = dayNewWords[6];
      return number;
    }
  }

  return 0;
}

/**
 * This function prepares an array of words for mini games
 * @param {*} numberOfAllWords the number of words that should be returned
 */
// eslint-disable-next-line import/prefer-default-export
export const prepareWords = (numberOfAllWords) => (_dispatch, getState) => {
  const store = getState();
  const userWords = getUserWords(store);
  const dictionaryWords = getDictionaryWords(store);
  const wordsDifficultyInApp = store.settings.optional.difficultyLevel - 1;
  const totalNumberOfNewWordsPerDay = store.settings.optional.newCardsPerDay;
  const shownNewWordsTodayFromStatistics = getNumberOfShownWordsToday(store.statistics.optional.dayNewWords, store.statistics.optional.dayDate);

  const tempUserWords = userWords
    // we need only words with the deleted field set to false
    .filter((word) => !word.userWord.optional.deleted)
    // check what user words can be used today (see the showDate field in the user words)
    .filter((word) => word.userWord.optional.showDate < new Date().getTime())
    // filter words that do not match current words difficulty
    .filter((word) => word.group === wordsDifficultyInApp);

  if (tempUserWords.length > numberOfAllWords) {
    const res = tempUserWords.filter((word, index) => index < numberOfAllWords);
    return { preparedWords: res, newWordsNumber: numberOfAllWords };
  }

  const numberOfUserWords = totalNumberOfNewWordsPerDay - shownNewWordsTodayFromStatistics;

  // if we do not have enough user words then use dictionary words instead
  let numberOfDictWords;
  if (tempUserWords.length > numberOfUserWords) {
    numberOfDictWords = numberOfAllWords - numberOfUserWords;
  } else {
    numberOfDictWords = numberOfAllWords - tempUserWords.length;
  }

  // prepare array with dictionary words (do not include words which already added as user words)
  const preparedDictionaryWords = prepareDictionaryWords(userWords, dictionaryWords, numberOfDictWords);

  const newWordsNumber = tempUserWords.length;
  const result = tempUserWords.concat(preparedDictionaryWords);

  shuffleArray(result);

  return { preparedWords: result, newWordsNumber };
};

export const passDictionaryWordsToUserWords = (dictionaryWord) => async (dispatch) => {
  const newWords = [];
  const oldWords = [];
  dictionaryWord.forEach((word) => {
    if (word.userWord) {
      if (!word.userWord.id || word.userWord.id === '') {
        newWords.push(word);
      } else {
        oldWords.push(word);
      }
    } else {
      newWords.push(word);
    }
  });
  if (newWords.length !== 0) { dispatch(postNewUserWords(newWords)); }
  if (oldWords.length !== 0) { dispatch(updateOldUserWords(oldWords)); }
};
