import { loginRequest, loginSuccess, loginFail } from './actions';
import { setJwtToken } from '../../common/utils/TokenUtils';
import { setUserId } from '../../common/utils/UserUtils';
import { fetchData } from '../common/auth-provider/service';
import { setDefaultUserSettings } from '../settings/service';
import { setDefaultUserStatistics } from '../long-term-statistics/statisticsService/statisticsService.js';

const loginUser = (email, password, callback) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const userData = {
      email,
      password,
    };

    const LOGIN_USER_URL = 'https://afternoon-falls-25894.herokuapp.com/signin';
    const response = await fetch(LOGIN_USER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const parsedResponse = await response.json();
    setJwtToken(parsedResponse.token);
    setUserId(parsedResponse.userId);

    dispatch(loginSuccess());
    callback();

    dispatch(fetchData());
  } catch (error) {
    dispatch(loginFail(error));
  }
};

export const defaultUserLoginForSendingData = (email, password, callback) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const userData = {
      email,
      password,
    };
    const LOGIN_USER_URL = 'https://afternoon-falls-25894.herokuapp.com/signin';
    const response = await fetch(LOGIN_USER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const parsedResponse = await response.json();
    setJwtToken(parsedResponse.token);
    setUserId(parsedResponse.userId);
    dispatch(loginSuccess());
    callback();
    await dispatch(setDefaultUserSettings());
    await dispatch(setDefaultUserStatistics());
    dispatch(fetchData());
  } catch (error) {
    dispatch(loginFail(error));
  }
};

export default loginUser;
