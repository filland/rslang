// Amount of time to use a measure for difficulty time addition
// Time base is a week
const timeBase = 604800000;
const hardWordTimeMultiplier = 1;
const normalWordTimeMultiplier = 2;
const easyWordTimeMultiplier = 4;

// Default properties for userWord for converted words
const userWordDefault = {
  difficulty: "normal",
  optional: {
    deleted: false,
    createdDate: new Date().getTime(),
    showDate: new Date().getTime()
  },
};

// Function converts dictionary word to user word by adding userWord property
export function convertDictionaryToUserWord(word, wordProps = userWordDefault) {
  return word.userWord ? word : { ...word, userWord: wordProps };
}

export const setWordDifficulty = (word, difficulty) => {
  console.log("Получено слово:", word);
  let convertedWord = word.userWord ? word : convertDictionaryToUserWord(word);
      return {
        ...convertedWord,
        userWord: {
          ...convertedWord.userWord,
          difficulty,
        },
      };
};

export const setWordDeleted = (word) => {
  let convertedWord = word.userWord ? word : convertDictionaryToUserWord(word);
  return {
    ...convertedWord,
    userWord: {
      ...convertedWord.userWord,
      optional: {
        ...convertedWord.userWord.optional,
        deleted: true,
      },
    },
  };
};
