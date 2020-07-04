import getFormattedTemp from './utils';
import {
  fetchWeatherSuccess,
  fetchWeatherFail,
  fetchWeatherRequest,
} from './actions';
import { getCitySelector } from './selectors';

const fetchWeatherService = (city) => async (dispatch, getState) => {
  try {
    const state = getState();
    const defaultCity = getCitySelector(state);
    const cityName = city || defaultCity;

    dispatch(fetchWeatherRequest());

    const urlTodayWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`;
    const response = await fetch(urlTodayWeather);
    const parsedResponse = await response.json();
    const currentWeather = getFormattedTemp(parsedResponse.main.temp);

    dispatch(fetchWeatherSuccess(currentWeather, cityName));
  } catch (error) {
    dispatch(fetchWeatherFail(error));
  }
};

export default fetchWeatherService;
