export const getToken = () => {
  const token = window.localStorage.getItem('token');
  return token;
};

export const setToken = (token) => {
  window.localStorage.setItem('token', token);
};

export const deleteToken = () => {
  window.localStorage.removeItem('token');
};
