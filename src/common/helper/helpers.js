export const transformOldWordsArrayToCorrectType = (oldWords) => {
  const arrayOfOldUserWords = [];
  oldWords.forEach((word) => {
    const userWord = {
      difficulty: word.userWord.difficulty,
      optional: {
        ...word.userWord.optional,
        counter: word.userWord.optional.counter + 1,
        updatedDate: Date.now(),
      },
    };
    arrayOfOldUserWords.push(userWord);
  });
  return arrayOfOldUserWords;
};

export const transformNewWordsArrayToCorrectType = (newWords) => {
  const arrayOfNewUserWords = [];
  newWords.forEach((word) => {
    const userWord = {
      difficulty: word.userWord ? word.userWord.difficulty : 'normal',
      optional: {
        counter: 1,
        createdDate: Date.now(),
        deleted: word.userWord ? word.userWord.optional.deleted : false,
        group: word.group,
        showDate: Date.now(),
        updatedDate: Date.now(),
      },
    };
    arrayOfNewUserWords.push(userWord);
  });
  return arrayOfNewUserWords;
};
