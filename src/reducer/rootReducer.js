import { combineReducers } from "redux";
import { weatherReducer } from "../component/weather/reducer";
import { dictionaryReducer } from "../component/dictionary/reducer";

export const rootReducer = combineReducers({
  weather: weatherReducer,
  dictionary: dictionaryReducer,
});
