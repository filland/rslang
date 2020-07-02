/* eslint-disable max-len */
const getWordTodayCount = (wordArray) => wordArray.filter(({ optionalUpdatedDateToNowDays }) => optionalUpdatedDateToNowDays === 0).length;

export default getWordTodayCount;
