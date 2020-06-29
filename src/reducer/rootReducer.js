import { combineReducers } from 'redux';
import weatherReducer from '../component/weather/reducer';
import loginReducer from '../component/login/reducer';
import registrationReducer from '../component/registration/reducer';
import dictionaryReducer from '../component/dictionary/reducer';
import settingsReducer from '../component/settings/reducer';
import GamePageReducer from '../component/english-puzzle/redux/reducers';
import authReducer from '../component/common/auth-provider/reducer';
import statisticsReducer from '../component/long-term-statistics/reducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  login: loginReducer,
  registration: registrationReducer,
  settings: settingsReducer,
  dictionary: dictionaryReducer,
  puzzleGame: GamePageReducer,
  auth: authReducer,
  statistics: statisticsReducer,
});

export default rootReducer;
