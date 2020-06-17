const USER_ID = 'userId';

export const setUserId = (userId) => {
  localStorage.setItem(USER_ID, userId);
};

export const getUserId = () => {
  const jwtToken = localStorage.getItem(USER_ID);
  return jwtToken;
};
