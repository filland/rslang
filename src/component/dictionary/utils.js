/* eslint-disable indent */
/* eslint-disable max-len */

export function getWordTodayCount(wordArray) {
    return wordArray.filter(({ optionalUpdatedDateToNowDays }) => optionalUpdatedDateToNowDays === 0).length;
}

export function formatDateInWord(word) {
    const d = word.optional && word.optional.updatedDate ? new Date(parseInt(word.optional.updatedDate, 10)) : new Date();
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
}
