/* eslint-disable max-len */
export const parseArraytoString = (data) => {
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

export const transformArray = (playAllWords, playNewWords, store) => {
  const templateInput = {
    learnedWords: store.statistics.learnedWords,
    optional: {
      dayAllWords: store.statistics.optional.dayAllWords,
      dayNewWords: store.statistics.optional.dayNewWords,
      dayDate: store.statistics.optional.dayDate,
      newWords: store.statistics.optional.newWords,
      oldWords: store.statistics.optional.oldWords,
    },
  };

  const templateString = JSON.stringify(templateInput);
  let template = JSON.parse(templateString);
  const { dayAllWords, dayNewWords, dayDate } = template.optional;

  const dateNow = Date.now();
  const currentDate = new Date(dateNow).toLocaleDateString();
  const inputDate = new Date(Number(dayDate[dayDate.length - 1])).toLocaleDateString();

  if (currentDate === inputDate) {
    const totalDayWords = Number(playAllWords) + Number(dayAllWords[dayAllWords.length - 1]);
    dayAllWords[dayAllWords.length - 1] = totalDayWords;
    const totalDayNewWords = Number(playNewWords) + Number(dayNewWords[dayNewWords.length - 1]);
    dayNewWords[dayNewWords.length - 1] = totalDayNewWords;
  } else {
    const totalDayWords = playAllWords;
    dayAllWords.shift();
    dayAllWords.push(totalDayWords);
    const totalDayNewWords = playNewWords;
    dayNewWords.shift();
    dayNewWords.push(totalDayNewWords);
    dayDate.shift();
    dayDate.push(dateNow);
  }
  const totalWeekWords = dayAllWords.reduce((total, current) => Number(total) + Number(current), 0);
  const totalWeekNewWords = dayNewWords.reduce((total, current) => Number(total) + Number(current), 0);
  const totalWeekOldWords = totalWeekWords - totalWeekNewWords;

  template = {
    learnedWords: totalWeekWords,
    optional: {
      dayAllWords,
      dayNewWords,
      dayDate,
      newWords: totalWeekNewWords,
      oldWords: totalWeekOldWords,
    },
  };
  return template;
};
