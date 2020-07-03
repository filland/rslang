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

const millisecondsInDay = 86400000;
const numberOfDays = [1, 2, 3, 4, 5, 6, 7];
const dayDateList = numberOfDays
  .map((element, index) => Date.now() - millisecondsInDay * index)
  .reverse();
const templateInput = {
  learnedWords: 0, // totalWeekWords
  optional: {
    dayAllWords: [0, 0, 0, 0, 0, 0, 0], // renewDayAllWords
    dayNewWords: [0, 0, 0, 0, 0, 0, 0], // renewtotalNewWords
    dayDate: dayDateList, // arrayOfDate
    newWords: 0, // totalWeekNewWords
    oldWords: 0, // totalWeekOldWords
  },
};

export const transformArray = (playAllWords, playNewWords) => {
  const dateNow = Date.now();
  const currentDate = new Date(dateNow).toLocaleDateString();
  const inputDate = new Date(dayDateList[dayDateList.length - 1]).toLocaleDateString();

  const templateString = JSON.stringify(templateInput);
  let template = JSON.parse(templateString);

  const { dayAllWords, dayNewWords, dayDate } = template.optional;
  let arrayOfDate;

  if (currentDate === inputDate) {
    const totalDayWords = Number(playAllWords) + Number(dayAllWords[dayAllWords.length - 1]);
    dayAllWords[dayAllWords.length - 1] = totalDayWords;
    const totalDayNewWords = Number(playNewWords) + Number(dayNewWords[dayNewWords.length - 1]);
    dayNewWords[dayNewWords.length - 1] = totalDayNewWords;
    arrayOfDate = dayDate;
  } else {
    const totalDayWords = playAllWords;
    dayAllWords.shift().push(totalDayWords);
    const totalDayNewWords = playNewWords;
    dayNewWords.shift().push(totalDayNewWords);
    arrayOfDate = dayDate.shift().push(dateNow);
  }
  const totalWeekWords = dayAllWords.reduce((total, current) => Number(total) + Number(current), 0);
  const totalWeekNewWords = dayNewWords.reduce((total, current) => Number(total) + Number(current), 0);
  const totalWeekOldWords = totalWeekWords - totalWeekNewWords;

  template = {
    learnedWords: totalWeekWords,
    optional: {
      dayAllWords,
      dayNewWords,
      dayDate: arrayOfDate,
      newWords: totalWeekNewWords,
      oldWords: totalWeekOldWords,
    },
  };

  console.log('template: ', template);
  return template;
};
