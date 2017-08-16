const fetchMessage = messageData => ({
  type: 'MESSAGE_FETCH_SUCCESS',
  payload: messageData,
});

export {
  fetchMessage,
};
