import getUserWords from '../../component/common/word/user-word/selectors';
import getDictionaryWords from '../../component/common/word/dictionary-word/selectors';
import { putOldUserWords, postNewUserWords } from '../../component/common/word/user-word/service';
import { transformOldWordsArrayToCorrectType, transformNewWordsArrayToCorrectType } from './helpers';

function getRandomIndex(upperBorder) {
  return Math.round(Math.random() * upperBorder);
}

/**
 * Checks if the dictionary word was already added to user's dictionary
 */
function isUserWord(dictionaryWord, userWords) {
  return userWords.find((word) => word.userWord.wordId === dictionaryWord.id) !== undefined;
}
/**
 * This function creates an array of randomly selected dictionary words of the
 * specified length @param numberOfDictionaryWords which were not added to user words yet
 */
function prepareDictionaryWords(userWords, dictionaryWords, numberOfDictionaryWords) {
  const dictionaryWordsArray = [];

  // this number is used to avoid infinite loop
  const MAX_ITERATION_NUMBER = 1000;
  let counter = 0;
  while (dictionaryWordsArray.length !== numberOfDictionaryWords) {
    if (counter > MAX_ITERATION_NUMBER) {
      break;
    }
    const dictionaryWordIndex = getRandomIndex(dictionaryWords.length - 1);
    const dictionaryWord = dictionaryWords[dictionaryWordIndex];

    if (!isUserWord(dictionaryWord, userWords) && !dictionaryWordsArray.includes(dictionaryWord)) {
      dictionaryWordsArray.push(dictionaryWord);
    }
    counter += 1;
  }

  return dictionaryWordsArray;
}

/**
 * Shuffle elements of the provided @param array
 */
const shuffleArray = (array) => {
  array.sort(() => Math.random() - 0.5);
};

function getNumberOfShownWordsToday(dayNewWords, daysDates) {
  if (dayNewWords && daysDates) {
    const latestDateMills = daysDates[6];
    const latestDate = new Date(latestDateMills);
    const currentDate = new Date();
    if (latestDate.toLocaleDateString() === currentDate.toLocaleDateString()) {
      const number = dayNewWords[6];
      return number;
    }
  }

  return 0;
}

/**
 * This function prepares an array of words for mini games
 * @param {*} numberOfAllWords the number of words that should be returned
 */
// eslint-disable-next-line import/prefer-default-export
export const prepareWords = (numberOfAllWords) => (_dispatch, getState) => {
  const store = getState();
  const userWords = getUserWords(store);
  const dictionaryWords = getDictionaryWords(store);
  const wordsDifficultyInApp = store.settings.optional.difficultyLevel - 1;
  const totalNumberOfNewWordsPerDay = store.settings.optional.newCardsPerDay;
  const shownNewWordsTodayFromStatistics = getNumberOfShownWordsToday(store.statistics.optional.dayNewWords, store.statistics.optional.dayDate);

  const tempUserWords = userWords
    // we need only words with the deleted field set to false
    .filter((word) => !word.userWord.optional.deleted)
    // check what user words can be used today (see the showDate field in the user words)
    .filter((word) => word.userWord.optional.showDate < new Date().getTime())
    // filter words that do not match current words difficulty
    .filter((word) => word.group === wordsDifficultyInApp);

  if (tempUserWords.length > numberOfAllWords) {
    const res = tempUserWords.filter((word, index) => index < numberOfAllWords);
    return { preparedWords: res, newWordsNumber: numberOfAllWords };
  }

  const numberOfUserWords = totalNumberOfNewWordsPerDay - shownNewWordsTodayFromStatistics;

  // if we do not have enough user words then use dictionary words instead
  let numberOfDictWords;
  if (tempUserWords.length > numberOfUserWords) {
    numberOfDictWords = numberOfAllWords - numberOfUserWords;
  } else {
    numberOfDictWords = numberOfAllWords - tempUserWords.length;
  }

  // prepare array with dictionary words (do not include words which already added as user words)
  const preparedDictionaryWords = prepareDictionaryWords(userWords, dictionaryWords, numberOfDictWords);

  const newWordsNumber = tempUserWords.length;
  const result = tempUserWords.concat(preparedDictionaryWords);

  shuffleArray(result);

  return { preparedWords: result, newWordsNumber };
};

const dictionaryWord = [
  {
    audio: 'files/01_2401.mp3',
    audioExample: 'files/01_2401_example.mp3',
    audioMeaning: 'files/01_2401_meaning.mp3',
    group: 4,
    id: '5e9f5ee35eb9e72bc21afe00',
    image: 'files/01_2401.jpg',
    page: 0,
    textExample: 'I love the <b>aroma</b> of coffee in the morning.',
    textExampleTranslate: 'Я люблю аромат кофе по утрам',
    textMeaning: 'An <i>aroma</i> is a scent or smell.',
    textMeaningTranslate: 'Аромат - это запах или благоухание',
    transcription: '[əróumə]',
    word: 'aroma',
    wordTranslate: 'аромат',
    wordsPerExampleSentence: 9,
  },
  {
    audio: 'files/01_2402.mp3',
    audioExample: 'files/01_2402_example.mp3',
    audioMeaning: 'files/01_2402_meaning.mp3',
    group: 4,
    id: '5e9f5ee35eb9e72bc21afe01',
    image: 'files/01_2402.jpg',
    page: 0,
    textExample: 'The waiter brought our <b>beverages</b> first. Then he brought our food.',
    textExampleTranslate: 'Сначала официант принес наши напитки. Затем он принес нашу еду',
    textMeaning: 'A <i>beverage</i> is a drink.',
    textMeaningTranslate: 'Напиток - это то, что пьют',
    transcription: '[bévəridʒ]',
    word: 'beverage',
    wordTranslate: 'напиток',
    wordsPerExampleSentence: 11,
  },
  {
    audio: 'audio',
    audioExample: 'SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjE3LjEwMQAAAA',
    audioMeaning: 'SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjE3LjEwMQAAAA',
    group: 0,
    id: '5e9f5ee35eb9e72bc21af4a2',
    image: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg',
    page: 0,
    textExample: 'There is a small <b>boat</b> on the lake.',
    textExampleTranslate: 'На озере есть маленькая лодка',
    textMeaning: 'A <i>boat</i> is a vehicle that moves across water.',
    textMeaningTranslate: 'Лодка - это транспортное средство, которое движется по воде',
    transcription: '[bout]',
    userWord: {
      difficulty: 'normal',
      id: '5f0202599c3d6500177e3522',
      optional: {
        counter: 1,
        createdDate: 1593967172737,
        deleted: false,
        group: 0,
        showDate: 1593967172737,
        updatedDate: 1593967172737,
      },
      wordId: '5e9f5ee35eb9e72bc21af4a2',
    },
    word: 'boat',
    wordTranslate: 'лодка',
    wordsPerExampleSentence: 8,
  },
  {
    audio: 'audio',
    audioExample: 'SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjE3LjEwMQAAAA',
    audioMeaning: 'SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjE3LjEwMQAAAA',
    group: 0,
    id: '5e9f5ee35eb9e72bc21af4a1',
    image: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg',
    page: 0,
    textExample: 'The students <b>agree</b> they have too much homework.',
    textExampleTranslate: 'Студенты согласны, что у них слишком много домашней работы',
    textMeaning: 'To <i>agree</i> is to have the same opinion or belief as another person.',
    textMeaningTranslate: 'Согласиться - значит иметь то же мнение или убеждение, что и другой человек',
    transcription: '[əgríː]',
    userWord: {
      difficulty: 'normal',
      optional: {
        deleted: false,
        showDate: 1593967215344,
      },
      wordId: '5e9f5ee35eb9e72bc21af4a1',
    },
    word: 'agree',
    wordTranslate: 'согласна',
    wordsPerExampleSentence: 8,
  },
];

const userWord = {
  difficulty: 'normal',
  id: '5f0202599c3d6500177e3522',
  optional: {
    counter: 1,
    createdDate: 1593967172737,
    deleted: false,
    group: 0,
    showDate: 1593967172737,
    updatedDate: 1593967172737,
  },
};

export const passDictionaryWordsToUserWords = (dictionaryWord) => async (dispatch) => {
  const newWords = [];
  const oldWords = [];
  dictionaryWord.forEach((word) => {
    if (word.userWord) {
      if (!word.userWord.id || word.userWord.id === '') {
        console.log('Поле есть, id НЕТ или Пустое, слово НОВОЕ (POST)!!!');
        newWords.push(word);
      } else {
        console.log('Поле есть, id есть, слово СТАРОЕ (PUT)!!!');
        oldWords.push(word);
      }
    } else {
      console.log('Поля нет, слово НОВОЕ (POST)!!!');
      newWords.push(word);
    }
  });
  const transformOldWords = transformOldWordsArrayToCorrectType(oldWords);
  const transformNewWords = transformNewWordsArrayToCorrectType(newWords);

  dispatch(putOldUserWords(transformOldWords))
  // dispatch(postNewUserWords(newWords-что-то другое будет));

};
