import { STATISTICS_REQUEST, STATISTICS_SUCCESS, STATISTICS_FAIL } from './constants';

export function statisticsRequest() {
  return {
    type: STATISTICS_REQUEST,
    payload: {
      isLoading: true,
      isError: false,
    },
  };
}

export function statisticsSuccess(data) {
  return {
    type: STATISTICS_SUCCESS,
    payload: {
      isLoading: false,
      data,
    },
  };
}

export function statisticsFail(error) {
  return {
    type: STATISTICS_FAIL,
    payload: {
      isLoading: false,
      isError: true,
      error,
    },
  };
}
