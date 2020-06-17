import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAIL,
} from './constants';

export function fetchWeatherRequest() {
  return {
    type: FETCH_WEATHER_REQUEST,
    payload: {
      isLoading: true,
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
