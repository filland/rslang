import getDataForNextWord from './helper';

export const CHANGE_CURRENT_WORD = 'CHANGE_CURRENT_WORD_SAVANNAH';
export const CHECK_ANSWER = 'CHECK_ANSWER_SAVANNAH';
export const START_GAME = 'START_SAVANNAH_GAME';
export const END_GAME = 'END_SAVANNAH_GAME';
export const CHANGE_VOLUME = 'CHANGE_VOLUME_SAVANNAH';
export const SHOW_WORD_DATA = 'SHOW_WORD_DATA_SAVANNAH';
export const CHANGE_TIMER = 'CHANGE_TIMER_SAVANNAH';
export const TIMER_OFF = 'TIMER_OFF';
export const ANIMATION = 'ANIMATION';
export const CHANGE_WAITING_ANSWER = 'CHANGE_WAITING_ANSWER';
export const TIME_IS_OVER = 'TIME_IS_OVER';

export const changeWord = (
  numOfCurrentWord, words,
) => async (dispatch) => {
  const dataForNextWord = await getDataForNextWord(numOfCurrentWord, words);

  dispatch({
    type: CHANGE_CURRENT_WORD,
    payload: {
      currentWordData: dataForNextWord.currentWordData,
      data: dataForNextWord.data,
      arrOfRandomWords: dataForNextWord.arrOfRandomWords,
      numOfCurrentWord: dataForNextWord.numOfWord,
      checkingAnswer: false,
      timeIsOn: false,
      isWaitingAnswer: true,
      allWords: words,
    },
  });
};

export const checkAnswer = ({
  target, answer, lifesCount, iKnowArr,
  iDontKnowArr, currentWordData,
}) => async (dispatch) => {
  let lifes = lifesCount;
  if (target.id === answer.id) {
    iKnowArr.push({
      ...currentWordData,
    });
  } else {
    lifes -= 1;
    iDontKnowArr.push({
      ...currentWordData,
    });
  }
  dispatch({
    type: CHECK_ANSWER,
    payload: {
      lifesCount: lifes,
      iKnowArr,
      iDontKnowArr,
      checkingAnswer: true,
      isWaitingAnswer: false,
    },
  });
};

export const changeWordAfterTimer = ({
  lifesCount, iKnowArr,
  iDontKnowArr, currentWordData,
}) => async (dispatch) => {
  iDontKnowArr.push({
    ...currentWordData,
  });

  dispatch({
    type: TIME_IS_OVER,
    payload: {
      lifesCount: lifesCount - 1,
      iKnowArr,
      iDontKnowArr,
      checkingAnswer: true,
      isWaitingAnswer: false,
    },
  });
};

export const startGame = () => ({
  type: START_GAME,
  payload: {
    gameWasStarted: true,
  },
});

export const endGame = () => (dispatch) => {
  dispatch({
    type: END_GAME,
    payload: {
      gameWasStarted: false,
      lifesCount: 5,
      iKnowArr: [],
      iDontKnowArr: [],
      numOfCurrentWord: 0,
      timerIsOff: false,
      seconds: 3,
      isWaitingAnswer: false,
      timeIsOn: false,
    },
  });
};

export const changeVolume = (audio) => (dispatch) => {
  let audioOn;
  if (audio) {
    audioOn = false;
  } else {
    audioOn = true;
  }

  dispatch({
    type: CHANGE_VOLUME,
    payload: {
      audioOn,
    },
  });
};

export const showWordData = (isShowing, dataOfClickedWord) => (dispatch) => {
  let wordDataIsShowing;
  if (isShowing) {
    wordDataIsShowing = false;
  } else {
    wordDataIsShowing = true;
  }

  dispatch({
    type: SHOW_WORD_DATA,
    payload: {
      wordDataIsShowing,
      dataOfClickedWord,
    },
  });
};

export const changeTimerCount = (seconds, isAnimate) => ({
  type: CHANGE_TIMER,
  payload: {
    seconds: seconds - 1,
    isAnimate: !isAnimate,
  },
});

export const animation = (boolean) => ({
  type: ANIMATION,
  payload: {
    isAnimate: !boolean,
  },
});

export const changeTimer = (boolean) => (dispatch) => {
  dispatch({
    type: CHANGE_TIMER,
    payload: {
      timeIsOn: !boolean,
    },
  });
};

export const timerOff = () => ({
  type: TIMER_OFF,
  payload: {
    seconds: 3,
    timerIsOff: true,
  },
});
