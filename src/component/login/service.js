import { loginRequest, loginSuccess, loginFail } from './actions';
import { setJwtToken } from '../../common/utils/TokenUtils';
import { setUserId } from '../../common/utils/UserUtils';

const loginUser = (email, password) => async (dispatch) => {
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
  } catch (error) {
    dispatch(loginFail(error));
  }
};

export default loginUser;
