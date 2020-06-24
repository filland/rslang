import jwt from 'jwt-decode';

const JWT_TOKEN = 'token';

export const setJwtToken = (jwtToken) => {
  localStorage.setItem(JWT_TOKEN, jwtToken);
};

export const getJwtToken = () => {
  const jwtToken = localStorage.getItem(JWT_TOKEN);
  return jwtToken;
};

export const deleteJwtToken = () => {
  localStorage.removeItem(JWT_TOKEN);
};

/**
 * Checks if the JWT token is expired. If the JWT token is not expired it means that the user
 * is logged in. If otherwise then the user is not logged in
 */
export const isAuthorized = () => {
  const jwtToken = getJwtToken();
  if (!jwtToken) {
    return false;
  }
  const userSessionInfo = jwt(jwtToken);
  const date = new Date(0);
  date.setUTCSeconds(userSessionInfo.exp);
  console.log('is authorized = ', (date.getTime() > Date.now()));

  return date.getTime() > Date.now();
};
