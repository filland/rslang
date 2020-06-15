import { FETCH_WEATHER_REQUEST, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAIL } from "./constants";

const DEFAULT_CITY_NAME = "Minsk";

const initialState = {
  temp: null,
  city: DEFAULT_CITY_NAME,
  isLoading: false,
};

export function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_WEATHER_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
