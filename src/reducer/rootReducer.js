import { combineReducers } from 'redux';
import loginReducer from '../component/login/reducer';
import registrationReducer from '../component/registration/reducer';
import dictionaryReducer from '../component/dictionary/reducer';
import settingsReducer from '../component/settings/reducer';
import statisticsReducer from '../component/long-term-statistics/reducer';
import GamePageReducer from '../component/english-puzzle/redux/reducers';
import dictionaryWordsReducer from '../component/common/word/dictionary-word/reducer';
import userWordsReducer from '../component/common/word/user-word/reducer';
import savannaReducer from '../component/savanna/redux/reducer';
import sprintReducer from '../component/sprint/reducer';
import audioChallengeReducer from '../component/game/audioChallenge/pages/statistics/reducer';

const rootReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  settings: settingsReducer,
  dictionary: dictionaryReducer,
  puzzleGame: GamePageReducer,
  dictionaryWords: dictionaryWordsReducer,
  userWords: userWordsReducer,
  statistics: statisticsReducer,
  savannaGame: savannaReducer,
  sprint: sprintReducer,
  audioChallenge: audioChallengeReducer,
});

export default rootReducer;
