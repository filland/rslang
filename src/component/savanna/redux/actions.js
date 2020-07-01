import getDataForNextWord from './helper';

export const CHANGE_CURRENT_WORD = 'CHANGE_CURRENT_WORD';
export const CHECK_ANSWER = 'CHECK_ANSWER';
export const START_GAME = 'START_GAME';
export const END_GAME = 'END_GAME';

export const changeWord = (
  page, group, numOfCurrentWord, arrOfData,
) => async (dispatch) => {
  const dataForNextWord = await getDataForNextWord(page, group, numOfCurrentWord, arrOfData);

  dispatch({
    type: CHANGE_CURRENT_WORD,
    payload: {
      currentWordData: dataForNextWord.currentWordData,
      data: dataForNextWord.data,
      arrOfRandomWords: dataForNextWord.arrOfRandomWords,
      numOfCurrentWord: dataForNextWord.numOfWord,
      currentLevel: dataForNextWord.currentLevel,
      currentPage: dataForNextWord.currentPage,
      checkingAnswer: false,
    },
  });
};

export const checkAnswer = ({
  target, answer, lifesCount, iKnowArr,
  iDontKnowArr, currentWordData,
}) => async (dispatch) => {
  let lifes = lifesCount;
  const word = {
    word: currentWordData.word,
    wordTranslate: currentWordData.wordTranslate,
    audio: currentWordData.audio,
  };

  if (target.id === answer.id) {
    iKnowArr.push({
      ...word,
    });
  } else {
    lifes -= 1;
    iDontKnowArr.push({
      ...word,
    });
  }

  dispatch({
    type: CHECK_ANSWER,
    payload: {
      lifesCount: lifes,
      iKnowArr,
      iDontKnowArr,
      checkingAnswer: true,
    },
  });
};

export const startGame = () => ({
  type: START_GAME,
  payload: {
    gameWasStarted: true,
  },
});

export const endGame = () => ({
  type: END_GAME,
  payload: {
    gameWasStarted: false,
    lifesCount: 5,
    iKnowArr: [],
    iDontKnowArr: [],
  },
});
