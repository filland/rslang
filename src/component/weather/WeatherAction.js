import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAIL,
} from "./WeatherConst";

export function fetchWeatherRequest(city) {
  return {
    type: FETCH_WEATHER_REQUEST,
    payload: {
      isLoading: true,
      city,
    },
  };
}

export function fetchWeatherSuccess(temp, city) {
  return {
    type: FETCH_WEATHER_SUCCESS,
    payload: {
      isLoading: false,
      temp,
      city,
    },
  };
}

export function fetchWeatherFail() {
  return {
    type: FETCH_WEATHER_FAIL,
    payload: {
      isLoading: false,
    },
  };
}
