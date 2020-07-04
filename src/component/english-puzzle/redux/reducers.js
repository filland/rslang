import {
  CHANGE_DIFFICULT_OF_GAME,
  CHANGE_CURRENT_STRING,
  CHECK_RESULT_ARR,
  SHOW_CORRECT_RESULT,
  PUSH_SENTENCE_IN_SOLVED_ARR,
  DELL_SENTENCES_IN_SOLVED_ARR,
  SHOW_STATISTIC,
  GAME_CHANGE_INPUT,
  SHOW_FULL_IMG,
  SHOW_TRANSLATE_OF_SENTENCE,
  AUTO_PLAY_AUDIO,
  START_GAME,
  CHANGE_RESULT_ARR,
  CHANGE_ARR_OF_RANDOM_WORDS,
  DISABLE_IS_CHECKED,
} from './actions';

const defaultState = {
  page: 1,
  level: 1,
  pageForUser: 1,
  numberOfStr: 0,
  arrayOfData: [{ audioExample: 'files/01_0001_example.mp3' }],
  arrOfRandomWords: [],
  arrOfResult: [],
  correctArr: [],
  wordForResult: '',
  isChecked: false,
  isDone: false,
  arrOfError: [],
  arrayOfSolvedSentences: [],
  iDontKnowArr: [],
  iKnowArr: [],
  statisticIsShowed: false,
  imgIsShowed: false,
  pictureData: { imageSrc: 'level1/ice_land.jpg' },
  translateIsShowed: false,
  autoPlay: false,
  gameWasStarted: false,
};

const GamePageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_DIFFICULT_OF_GAME:
      return {
        ...state,
        page: action.payload.page,
        level: action.payload.level,
        arrayOfData: action.payload.arrayOfData,
        arrOfRandomWords: action.payload.arrOfRandomWords,
        correctArr: action.payload.correctArr,
        pageForUser: action.payload.pageForUser,
        pictureData: action.payload.pictureData,
        arrOfResult: action.payload.arrOfResult,
        arrayOfSolvedSentences: [],
        iDontKnowArr: [],
        iKnowArr: [],
        statisticIsShowed: false,
        imgIsShowed: false,
        numberOfStr: 0,

      };
    case CHANGE_CURRENT_STRING:
      return {
        ...state,
        arrOfRandomWords: action.payload.arrOfRandomWords,
        correctArr: action.payload.correctArr,
        numberOfStr: action.payload.numberOfStr,
        isDone: action.payload.isDone,
        arrOfResult: action.payload.arrOfResult,
      };
    case CHECK_RESULT_ARR:
      return {
        ...state,
        arrOfError: action.payload.arrOfError,
        isChecked: action.payload.isChecked,
        isDone: action.payload.isDone,
      };
    case SHOW_CORRECT_RESULT:
      return {
        ...state,
        arrOfResult: action.payload.arrOfResult,
        isChecked: action.payload.isChecked,
        isDone: action.payload.isDone,
      };
    case PUSH_SENTENCE_IN_SOLVED_ARR:
      return {
        ...state,
        arrayOfSolvedSentences: action.payload.arrayOfSolvedSentences,
        isChecked: action.payload.isChecked,
        isDone: action.payload.isDone,
      };
    case DELL_SENTENCES_IN_SOLVED_ARR:
      return {
        ...state,
        arrayOfSolvedSentences: action.payload.arrayOfSolvedSentences,
        isChecked: action.payload.isChecked,
        isDone: action.payload.isDone,
      };
    case SHOW_STATISTIC:
      return {
        ...state,
        statisticIsShowed: action.payload.statisticIsShowed,
      };
    case GAME_CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case SHOW_FULL_IMG:
      return {
        ...state,
        imgIsShowed: action.payload.imgIsShowed,
      };
    case SHOW_TRANSLATE_OF_SENTENCE:
      return {
        ...state,
        translateIsShowed: action.payload.translateIsShowed,
      };
    case AUTO_PLAY_AUDIO:
      return {
        ...state,
        autoPlay: action.payload.autoPlay,
      };
    case START_GAME:
      return {
        ...state,
        gameWasStarted: action.payload.gameWasStarted,
      };
    case CHANGE_RESULT_ARR:
      return {
        ...state,
        arrOfResult: action.payload.arrOfResult,
      };
    case CHANGE_ARR_OF_RANDOM_WORDS:
      return {
        ...state,
        arrOfRandomWords: action.payload.arrOfRandomWords,
      };
    case DISABLE_IS_CHECKED:
      return {
        ...state,
        isChecked: action.payload.isChecked,
      };

    default:
      return state;
  }
};
export default GamePageReducer;
