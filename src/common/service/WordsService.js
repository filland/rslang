function getRandomIndex(upperBorder) {
  return Math.round(Math.random() * upperBorder);
}

/**
 * Checks if the dictionary word was already added to user's dictionary
 */
function isUserWord(dictionaryWord, userWords) {
  return userWords.find((word) => word.wordId === dictionaryWord.id) !== undefined;
}
/**
 * This function creates an array of randomly selected dictionary words of the
 * specified length @param numberOfDictionaryWords which were not added to user words yet
 */
function prepareDictionaryWords(userWords, dictionaryWords, numberOfDictionaryWords) {
  const dictionaryWordsArray = [];

  while (dictionaryWordsArray.length !== numberOfDictionaryWords) {
    const dictionaryWordIndex = getRandomIndex(dictionaryWords.length - 1);
    const dictionaryWord = dictionaryWords[dictionaryWordIndex];

    if (!isUserWord(dictionaryWord, userWords) && !dictionaryWordsArray.includes(dictionaryWord)) {
      dictionaryWordsArray.push(dictionaryWord);
    }
  }

  return dictionaryWordsArray;
}

/**
 * Shuffle elements of the provided @param array
 */
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

/**
 * This function prepares an array of words for mini games
 * @param {*} userWords all user words
 * @param {*} dictionaryWords all dictionary words
 * @param {*} number the number of words that should be returned
 */
export function prepareWords(userWords, dictionaryWords, number) {
  const tempUserWords = userWords
    // we need only words with the deleted field set to false
    .filter((word) => !word.optional.deleted)
    // check what user words can be used today (see the showDate field in the user words)
    .filter((word) => word.optional.showDate < new Date().getTime());

  // 50 % of words in the result array should be populated with dictionary words
  // and 50 % with user words
  // if we do not have enough user words then use dictionary words instead
  let numberOfDictWords;
  if (tempUserWords.length < number / 2) {
    numberOfDictWords = number - tempUserWords.length;
  }

  // prepare array with user words
  const userWordsArr = tempUserWords.map((word) => word.dictionaryWord);

  // prepare array with dictionary words (do not include words which already added as user words)
  const dictionaryWordsArray = prepareDictionaryWords(userWords, dictionaryWords, numberOfDictWords);

  const result = userWordsArr.concat(dictionaryWordsArray);

  // shuffle the array
  const resultShuffled = shuffleArray(result);

  return resultShuffled;
}

export function saveOrUpdateUserWord(word) {
  //  TODO 
}
