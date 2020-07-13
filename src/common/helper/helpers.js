export const transformOldWordsArrayToCorrectType = (oldWords) => {
  const oldWordsString = JSON.stringify(oldWords);
  const copyOldWords = JSON.parse(oldWordsString);
  const arrayOfNewUserWords = [];
  copyOldWords.forEach((word) => {
    const userWord = {
      difficulty: word.userWord.difficulty,
      optional: {
        ...word.userWord.optional,
        counter: word.userWord.optional.counter + 1,
        updatedDate: Date.now(),
      },
    };
    arrayOfNewUserWords.push(userWord);
  });
  console.log(arrayOfNewUserWords);
  return arrayOfNewUserWords;
};

export const transformNewWordsArrayToCorrectType = (newWords) => {
  const newWordsString = JSON.stringify(newWords);
  const copyNewWords = JSON.parse(newWordsString);
  const arrayOfNewUserWords = [];
  copyNewWords.forEach((word) => {
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
