import {
  getListOfWords,
  getArrOfRandomWords,
} from "../fetchGameData";
import paintings1 from "../dataOfPicturesGallery/level1";
import paintings2 from "../dataOfPicturesGallery/level2";
import paintings3 from "../dataOfPicturesGallery/level3";
import paintings4 from "../dataOfPicturesGallery/level4";
import paintings5 from "../dataOfPicturesGallery/level5";
import paintings6 from "../dataOfPicturesGallery/level6";

const arrOfGalleryData = [
  "",
  paintings1,
  paintings2,
  paintings3,
  paintings4,
  paintings5,
  paintings6,
];

export const CHANGE_DIFFICULT_OF_GAME = "CHANGE_DIFFICULT_OF_GAME";
export const CHANGE_CURRENT_STRING = "CHANGE_CURRENT_STRING";
export const PUSH_WORD_IN_RESULT_ARR = "PUSH_WORD_IN_RESULT_ARR";
export const REMOVE_WORD_FROM_RESULT_ARR = "REMOVE_WORD_FROM_RESULT_ARR";
export const CHECK_RESULT_ARR = "CHECK_RESULT_ARR";
export const SHOW_CORRECT_RESULT = "SHOW_CORRECT_RESULT";
export const PUSH_SENTENCE_IN_SOLVED_ARR = "PUSH_SENTENCE_IN_SOLVED_ARR";
export const DELL_SENTENCES_IN_SOLVED_ARR = "DELL_SENTENCES_IN_SOLVED_ARR";
export const SHOW_STATISTIC = "SHOW_STATISTIC";
export const GAME_CHANGE_INPUT = "GAME_CHANGE_INPUT";
export const SHOW_FULL_IMG = "SHOW_FULL_IMG";
export const SHOW_TRANSLATE_OF_SENTENCE = "SHOW_TRANSLATE_OF_SENTENCE";
export const AUTO_PLAY_AUDIO = "AUTO_PLAY_AUDIO";

export const changeAutoPlayAudio = (bool) => (dispatch) => {
  let autoPlay;
  if (bool === true) {
    autoPlay = false;
  } else {
    autoPlay = true;
  }

  dispatch({
    type: AUTO_PLAY_AUDIO,
    payload: {
      autoPlay,
    },
  });
};
export const showTranslate = (bool) => (dispatch) => {
  let translateIsShowed;
  if (bool === true) {
    translateIsShowed = false;
  } else {
    translateIsShowed = true;
  }

  dispatch({
    type: SHOW_TRANSLATE_OF_SENTENCE,
    payload: {
      translateIsShowed,
    },
  });
};

export const showFullImg = () => ({
  type: SHOW_FULL_IMG,
  payload: {
    imgIsShowed: true,
  },
});
export const showStatistic = () => ({
  type: SHOW_STATISTIC,
  payload: {
    statisticIsShowed: true,
  },
});

export const cleanSolvedArr = () => (dispatch) => {
  const arrayOfSolvedSentences = [];

  dispatch({
    type: DELL_SENTENCES_IN_SOLVED_ARR,
    payload: {
      arrayOfSolvedSentences,
      isChecked: false,
      isDone: false,
    },
  });
};

export const pushSentenceInSolvedArr = (correctArr, arrayOfSolvedSentences) => (
  dispatch,
) => {
  const arr = correctArr.slice();
  arrayOfSolvedSentences.push(arr.join(" "));
  dispatch({
    type: PUSH_SENTENCE_IN_SOLVED_ARR,
    payload: { arrayOfSolvedSentences, isChecked: false, isDone: false },
  });
};

export const showCorrectResult = (
  correctArr,
  iDontKnowArr,
  arrayOfData,
  numberOfStr,
) => (dispatch) => {
  const arrOfResult = correctArr.slice();
  iDontKnowArr.push({
    str: arrOfResult.join(" "),
    audioSrc: arrayOfData[numberOfStr].audioExample,
    word: arrayOfData[numberOfStr].word,
  });

  dispatch({
    type: SHOW_CORRECT_RESULT,
    payload: { arrOfResult, isChecked: false, isDone: true },
  });
};

export const checkResultArr = (
  resultArr,
  correctArr,
  iKnowArr,
  arrayOfData,
  numberOfStr,
) => (dispatch) => {
  let isDone;
  const arrOfError = [];

  for (let i = 0; i <= correctArr.length; i += 1) {
    if (correctArr[i] !== resultArr[i]) {
      arrOfError.push(resultArr[i]);
    }
  }
  if (arrOfError.length === 0) {
    isDone = true;
    iKnowArr.push({
      str: resultArr.join(" "),
      audioSrc: arrayOfData[numberOfStr].audioExample,
      word: arrayOfData[numberOfStr].word,
    });
  } else {
    isDone = false;
  }
  dispatch({
    type: CHECK_RESULT_ARR,
    payload: { arrOfError, isChecked: true, isDone },
  });
};

export const dellWordFromResultArr = (arr, id, arrOfResult) => (dispatch) => {
  const i = arrOfResult.indexOf(id);
  const wordForResult = arrOfResult.splice(i, 1);
  arr.push(wordForResult[0]);
  dispatch({
    type: REMOVE_WORD_FROM_RESULT_ARR,
    payload: {
      arrOfResult,
      arrOfRandomWords: arr,
      wordForResult,
      isChecked: false,
    },
  });
};

export const pushWordInResultArr = (arr, id, arrOfResult) => (dispatch) => {
  const i = arr.indexOf(id);
  const wordForResult = arr.splice(i, 1);
  arrOfResult.push(wordForResult[0]);
  dispatch({
    type: PUSH_WORD_IN_RESULT_ARR,
    payload: {
      arrOfResult,
      arrOfRandomWords: arr,
      wordForResult,
      isChecked: false,
    },
  });
};

export const changeDifficultOfGame = (lev, p) => async (dispatch) => {
  let pageForUser;
  let level;
  if (p === 61) {
    pageForUser = 1;
    level = lev + 1;
  } else {
    pageForUser = p;
    level = lev;
  }
  const page = Math.ceil(pageForUser / 2);
  const arrayOfData = await getListOfWords(page, level);

  if (pageForUser % 2) {
    arrayOfData.splice(10, 10);
  } else {
    arrayOfData.splice(0, 10);
  }

  if (arrayOfData.length !== 0) {
    const pictureData = arrOfGalleryData[level][pageForUser - 1];
    const correctArr = arrayOfData[0].textExample.split(" ");
    const arrOfRandomWords = getArrOfRandomWords(0, arrayOfData);

    dispatch({
      type: CHANGE_DIFFICULT_OF_GAME,
      payload: {
        page,
        level,
        arrayOfData,
        arrOfRandomWords,
        correctArr,
        pageForUser,
        pictureData,
      },
    });
  }
};
// //////////
export const changeCurrentString = (numberOfStr, arrayOfData) => (dispatch) => {
  const correctArr = arrayOfData[numberOfStr + 1].textExample.split(" ");
  const arrOfRandomWords = getArrOfRandomWords(numberOfStr + 1, arrayOfData);

  dispatch({
    type: CHANGE_CURRENT_STRING,
    payload: {
      arrOfRandomWords,
      correctArr,
      numberOfStr: numberOfStr + 1,
      isDone: false,
    },
  });
};

export const setInputValue = (name, value) => ({
  type: GAME_CHANGE_INPUT,
  payload: { value, name },
});
