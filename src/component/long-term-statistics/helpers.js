const parseStringtoArray = (data) => {
  const dayAllWordsArray = data.optional.dayAllWords.split(',');
  const dayNewWordsArray = data.optional.dayNewWords.split(',');
  const dayDateArray = data.optional.dayDate.split(',');

  const result = {
    learnedWords: data.learnedWords,
    optional: {
      dayAllWords: dayAllWordsArray,
      dayNewWords: dayNewWordsArray,
      dayDate: dayDateArray,
      newWords: data.optional.newWords,
      oldWords: data.optional.oldWords,
    },
  };
  return result;
};

export default parseStringtoArray;
