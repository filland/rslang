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
    levelButtons: true,
    customSwitch: false,
    newCardsPerDay: 5,
    difficultyLevel: 2,
  },
  wordsPerDay: 35,
  isLoading: false,
};

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };

    case SETTINGS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case SETTINGS_FAIL:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export default settingsReducer;
