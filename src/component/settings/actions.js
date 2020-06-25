import {
  SETTINGS_REQUEST,
  SETTINGS_SUCCESS,
  SETTINGS_FAIL,
} from './constants';

export function settingsRequest() {
  return {
    type: SETTINGS_REQUEST,
    payload: {
      isLoading: true,
    },
  };
}

export function settingSuccess(data) {
  return {
    type: SETTINGS_SUCCESS,
    payload: data,
  };
}

export function settingFail(error) {
  return {
    type: SETTINGS_FAIL,
    payload: {
      isLoading: false,
      error,
    },
  };
}
