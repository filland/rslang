import { setJwtToken } from "../../common/utils/TokenUtils";
import { setUserId } from "../../common/utils/UserUtils";

export const loginUser = async (email, password) => {
  const userData = {
    email,
    password,
  };

  const LOGIN_USER_URL = "https://afternoon-falls-25894.herokuapp.com/signin";
  const response = await fetch(LOGIN_USER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();

  setJwtToken(data.token);
  setUserId(data.userId);
};
