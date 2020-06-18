import { combineReducers } from 'redux';
import weatherReducer from '../component/weather/reducer';
import loginReducer from '../component/login/reducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  login: loginReducer,
});

export default rootReducer;
