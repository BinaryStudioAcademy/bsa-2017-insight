export const getAllUsers = () => ({ type: 'GET_ALL_USERS' });

const fetchUser = (connection, userData) => ({
  type: 'FETCH_USER',
  connection,
  payload: userData,
});

