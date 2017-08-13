const getAllUsers = () => ({ type: 'GET_ALL_USERS' });

const fetchUser = userData => ({
  type: 'USER_FETCH_SUCCESS',
  payload: userData,
});

const fetchMessage = messageData => ({
  type: 'MESSAGE_FETCH_SUCCESS',
  payload: messageData,
});

export {
  fetchUser,
  fetchMessage,
  getAllUsers,
};

