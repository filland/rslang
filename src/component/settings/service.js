import { settingsRequest, settingSuccess, settingFail } from './actions';
import { getUserId } from '../../common/utils/UserUtils';
import { getJwtToken } from '../../common/utils/TokenUtils';

const userId = getUserId();
console.log('userId: ', userId);
const token = getJwtToken();
console.log('token: ', token);

const getUserSettings = () => async (dispatch) => {
  try {
    dispatch(settingsRequest());
    const getSettingsURL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`;
    const response = await fetch(getSettingsURL, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    const data = await response.json();
    console.log('data GET: ', data);
    dispatch(settingSuccess(data));
  } catch (error) {
    dispatch(settingFail(error));
  }
};

const setUserSettings = (settings) => async (dispatch) => {
  try {
    dispatch(settingsRequest());
    const setSettingsURL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`;
    const response = await fetch(setSettingsURL, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    const data = await response.json();
    console.log('data PUT: ', data);
    dispatch(settingSuccess(data));
  } catch (error) {
    dispatch(settingFail(error));
  }
};

export { getUserSettings, setUserSettings };
