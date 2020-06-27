/* eslint-disable max-len */
export const getWordsSelector = (store) => store.dictionary.words;
export const getWordCountSelector = (store) => store.dictionary.wordCount;
export const getWordCountTodaySelector = (store) => store.dictionary.wordCountToday;
export const getWordsDifficultSelector = (store) => store.dictionary.wordsDifficult;
export const getWordDifficultCountSelector = (store) => store.dictionary.wordDifficultCount;
export const getWordDifficultCountTodaySelector = (store) => store.dictionary.wordDifficultCountToday;
export const getWordsDeletedSelector = (store) => store.dictionary.wordsDeleted;
export const getWordDeletedCountSelector = (store) => store.dictionary.wordDeletedCount;
export const getWordDeletedCountTodaySelector = (store) => store.dictionary.wordDeletedCountToday;
export const getLosingFlagSelector = (store) => store.dictionary.isLoading;
