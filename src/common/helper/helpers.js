const selectNextShowDateByDifficulty = (diff) => {
  const millisecondsInDay = 86400000;
  let nextShowDate;
  if (diff = 'easy') {
    nextShowDate = Date.now() + millisecondsInDay*7;
  }
  if (diff = 'normal') {
    nextShowDate = Date.now() + millisecondsInDay*3;
  }
  if (diff = 'hard') {
    nextShowDate = Date.now() + millisecondsInDay;
  }
  return nextShowDate;
} 

export const transformOldWordsArrayToCorrectType = (oldWords) => {
  const oldWordsString = JSON.stringify(oldWords);
  const copyOldWords = JSON.parse(oldWordsString);
  const arrayOfNewUserWords = [];
  copyOldWords.forEach((word) => {
    const diff = word.userWord.difficulty;
    const nextShowDate = selectNextShowDateByDifficulty(diff);
    const userWord = {
      difficulty: diff,
      optional: {
        ...word.userWord.optional,
        counter: word.userWord.optional.counter + 1,
        deleted: word.userWord.deleted ? word.userWord.deleted : false,
        showDate: nextShowDate,
        updatedDate: Date.now(),
      },
    };
    arrayOfNewUserWords.push(userWord);
  });
  return arrayOfNewUserWords;
};

export const transformNewWordsArrayToCorrectType = (newWords) => {
  const newWordsString = JSON.stringify(newWords);
  const copyNewWords = JSON.parse(newWordsString);
  const arrayOfNewUserWords = [];
  const millisecondsInDay = 86400000;
  copyNewWords.forEach((word) => {
    const diff = word.userWord.difficulty;
    const nextShowDate = selectNextShowDateByDifficulty(diff);
    const userWord = {
      difficulty: word.userWord ? word.userWord.difficulty : 'normal',
      optional: {
        counter: 1,
        createdDate: Date.now(),
        deleted: word.userWord ? word.userWord.optional.deleted : false,
        group: word.group,
        showDate: word.userWord ? nextShowDate : Date.now() + millisecondsInDay*3,
        updatedDate: Date.now(),
      },
    };
    arrayOfNewUserWords.push(userWord);
  });
  return arrayOfNewUserWords;
};
