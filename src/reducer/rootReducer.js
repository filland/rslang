import { combineReducers } from "redux";
import { weatherReducer } from "../component/weather/reducer";

export const rootReducer = combineReducers({
  weather: weatherReducer,
});
