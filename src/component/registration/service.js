import { registrationRequest, registrationSuccess, registrationFail } from './actions';
import { defaultUserLoginForSendingData } from '../login/service';

const registerUser = (email, password) => async (dispatch) => {
  try {
    dispatch(registrationRequest());

    const userData = {
      email,
      password,
    };

    const REGISTER_USER_URL = 'https://afternoon-falls-25894.herokuapp.com/users';
    const response = await fetch(REGISTER_USER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      dispatch(registrationSuccess());
      dispatch(defaultUserLoginForSendingData(email, password));
    } else {
      dispatch(registrationFail('Status code in response is not 200'));
    }
  } catch (error) {
    dispatch(registrationFail(error));
  }
};

export default registerUser;
