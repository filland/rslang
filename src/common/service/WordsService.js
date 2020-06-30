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
  let numberOfDictionaryWords;
  if (tempUserWords.length < number / 2) {
    numberOfDictionaryWords = number - tempUserWords.length;
  }

  // prepare array with user words
  const userWordsArr = [];
  for (let i = 0; i < tempUserWords.length; i += 1) {
    const userWord = tempUserWords[i];

    // retrieve real word
    userWordsArr.push(userWord.dictionaryWord);
  }

  // prepare array with dictionary words (do not include words which already added as user words)
  const dictionaryWordsArray = [];
  for (let j = 0; j < numberOfDictionaryWords; j += 1) {
    const dictionaryWord = dictionaryWords[j];

    // do not include words that were added to the user words in the past
    // TODO
    dictionaryWordsArray.push(dictionaryWord);
  }

  const result = userWordsArr.concat(dictionaryWordsArray);

  // shuffle the array
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const resultShuffled = shuffleArray(result);

  return resultShuffled;
}

/**
 * Checks if the dictionary word was already added to user's dictionary
 */
function containsWord(dictionaryWord, userWords) {
  return userWords.find((word) => word.wordId === dictionaryWord.id) === undefined;
}

export function saveOrUpdateUserWord(word) {
  //  TODO 
}
