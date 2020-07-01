const parseStringtoArray = (data) => {
  const dayAllWordsString = data.optional.dayAllWords.split(',');
  const dayNewWordsString = data.optional.dayNewWords.split(',');
  const dayDateString = data.optional.dayDate.split(',');

  const result = {
    learnedWords: data.learnedWords,
    optional: {
      dayAllWords: dayAllWordsString,
      dayNewWords: dayNewWordsString,
      dayDate: dayDateString,
      newWords: data.optional.newWords,
      oldWords: data.optional.oldWords,
    },
  };
  return result;
};

export default parseStringtoArray;
