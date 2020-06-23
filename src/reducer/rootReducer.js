import { combineReducers } from 'redux';
import weatherReducer from '../component/weather/reducer';
import loginReducer from '../component/login/reducer';
import settingsReducer from '../component/settings/reducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  login: loginReducer,
  settings: settingsReducer,
});

export default rootReducer;
