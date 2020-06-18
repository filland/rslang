// export const getUserIdSelector = (store) => store.user.id;
// export const getUserTokenSelector = (store) => store.user.token;
export const getUserIdSelector = (store) => store.dictionary.user;
export const getUserTokenSelector = (store) => store.dictionary.user;
export const getWordsSelector = (store) => store.dictionary.words;
export const getLosingFlagSelector = (store) => store.worlds;
