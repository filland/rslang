const parseArraytoString = (data) => {
  const dayAllWordsString = data.optional.dayAllWords.join(',');
  const dayNewWordsString = data.optional.dayNewWords.join(',');
  const dayDateString = data.optional.dayDate.join(',');

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

export default parseArraytoString;
