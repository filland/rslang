import { combineReducers } from 'redux';
import weatherReducer from '../component/weather/reducer';
import loginReducer from '../component/login/reducer';
<<<<<<< HEAD
import GamePageReducer from '../component/english-puzzle/redux/reducers';
import sprintReducer from '../component/sprint/reducer';
=======
import registrationReducer from '../component/registration/reducer';
import dictionaryReducer from '../component/dictionary/reducer';
import settingsReducer from '../component/settings/reducer';
import GamePageReducer from '../component/english-puzzle/redux/reducers';
import dictionaryWordsReducer from '../component/common/word/dictionary-word/reducer';
import userWordsReducer from '../component/common/word/user-word/reducer';
>>>>>>> 5100c85c28288b1aa92930c47a51fceaf0fe513f

const rootReducer = combineReducers({
  weather: weatherReducer,
  login: loginReducer,
<<<<<<< HEAD
  puzzleGame: GamePageReducer,
  sprint: sprintReducer,
=======
  registration: registrationReducer,
  settings: settingsReducer,
  dictionary: dictionaryReducer,
  puzzleGame: GamePageReducer,
  dictionaryWords: dictionaryWordsReducer,
  userWords: userWordsReducer,
>>>>>>> 5100c85c28288b1aa92930c47a51fceaf0fe513f
});

export default rootReducer;
