import { settingsRequest, settingSuccess, settingFail } from './actions';

const getUserSettings = () => async (dispatch) => {
  try {
    dispatch(settingsRequest());
    const getSettingsURL = 'https://afternoon-falls-25894.herokuapp.com/doc/#/Users%2FSetting/get_users__id__settings';
    const response = await fetch(getSettingsURL);
    const data = await response.json();
    console.log('data: ', data);
    dispatch(settingSuccess(data));
  } catch (error) {
    console.log('error: ', error);
    dispatch(settingFail(error));
  }
};

const setUserSettings = (settings) => async (dispatch) => {
  try {
    dispatch(settingsRequest());
    const setSettingsURL = 'https://afternoon-falls-25894.herokuapp.com/doc/#/Users%2FSetting/put_users__id__settings';
    const response = await fetch(setSettingsURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    // const data = await response.json();
    // dispatch(settingSuccess(data));
  } catch (error) {
    console.log('error: ', error);
    dispatch(settingFail(error));
  }
};

export { getUserSettings, setUserSettings };
