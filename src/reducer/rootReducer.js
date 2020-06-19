import { combineReducers } from 'redux';
import weatherReducer from '../component/weather/reducer';
import loginReducer from '../component/login/reducer';
import GamePageReducer from '../component/english-puzzle/redux/reducers';

const rootReducer = combineReducers({
  weather: weatherReducer,
  login: loginReducer,
  puzzleGame: GamePageReducer,

});

export default rootReducer;
