import { combineReducers } from "redux";
import { weatherReducer } from "../component/weather/WeatherReducer";

export const rootReducer = combineReducers({
  weather: weatherReducer,
});
