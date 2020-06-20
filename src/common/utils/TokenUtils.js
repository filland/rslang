const JWT_TOKEN = 'token';

export const setJwtToken = (jwtToken) => {
  localStorage.setItem(JWT_TOKEN, jwtToken);
};

export const getJwtToken = () => {
  const jwtToken = localStorage.getItem(JWT_TOKEN);
  return jwtToken;
};
