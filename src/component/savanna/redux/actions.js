import { getListOfWords } from '../../english-puzzle/fetchGameData';

export const CHANGE_CURRENT_WORD = 'CHANGE_CURRENT_WORD';
export const CHECK_ANSWER = 'CHECK_ANSWER';
export const START_GAME = 'START_GAME';

export const changeWord = (page, group, numOfCurrentWord, arrOfData) => async (dispatch) => {
  let data;
  let currentLevel;
  let currentPage;
  let numOfWord;

  if (numOfCurrentWord === 0) {
    data = await getListOfWords(page, group);
    currentLevel = group;
    currentPage = page;
    numOfWord = numOfCurrentWord;
  } else if (group === 3 && numOfCurrentWord === 20) {
    currentLevel = 1;
    currentPage = page + 1;
    data = await getListOfWords(currentPage, currentLevel);
    numOfWord = 0;
  } else if (numOfCurrentWord === 20) {
    currentLevel = group + 1;
    data = await getListOfWords(page, currentLevel);
    currentPage = page;
    numOfWord = 0;
  } else {
    data = arrOfData;
    currentLevel = group;
    currentPage = page;
    numOfWord = numOfCurrentWord;
  }
  const currentWordData = data[numOfWord];
  let arrOfRandomWords;

  if (numOfWord > 16 && numOfWord <= 19) {
    const arr = data.slice(numOfWord);
    const p = data.slice(0, (4 - arr.length));
    arrOfRandomWords = arr.concat(p);
  } else {
    arrOfRandomWords = data.slice(numOfWord, numOfWord + 4);
  }

  for (let i = arrOfRandomWords.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arrOfRandomWords[j];
    arrOfRandomWords[j] = arrOfRandomWords[i];
    arrOfRandomWords[i] = temp;
  }

  dispatch({
    type: CHANGE_CURRENT_WORD,
    payload: {
      data,
      arrOfRandomWords,
      currentWordData,
      numOfCurrentWord: numOfWord,
      currentLevel,
      currentPage,
    },
  });
};

export const checkAnswer = (target, answer) => async (dispatch) => {
  if (target.id === answer.id) {
    target.classList.add('true');
  } else {
    const arr = target.parentElement.childNodes;
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].id === answer.id) {
        arr[i].classList.add('true');
      }
    }

    target.classList.add('false');
  }

  dispatch({
    type: CHECK_ANSWER,
    payload: {

    },
  });
};

export const startGame = () => ({
  type: START_GAME,
  payload: {
    gameWasStarted: true,
  },
});
