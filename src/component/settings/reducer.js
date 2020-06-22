import { SETTINGS_REQUEST, SETTINGS_SUCCESS, SETTINGS_FAIL } from './constants';

const initialState = {
  optional: {
    informationTranslate: true,
    informationDescription: false,
    informationExample: false,
    informationTranscription: true,
    informationPicture: false,
    btnShow: true,
    btnDelete: true,
    btnComplicated: false,
    btnAgain: true,
    btnHard: true,
    btnGood: true,
    btnEasy: true,
    customSwitch: false,
    newCardsPerDay: 25,
  },
  wordsPerDay: 5,
  isLoading: false,
};

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
      };

    case SETTINGS_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

export default settingsReducer;
