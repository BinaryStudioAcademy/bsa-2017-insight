const getAllUsers = () => ({ type: 'GET_ALL_USERS' });

const fetchUser = userData => ({
  type: 'USER_FETCH_SUCCESS',
  payload: userData,
});


export {
  fetchUser,
  getAllUsers,
};

