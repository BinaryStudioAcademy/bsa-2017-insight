const fetchMessage = messageData => ({
  type: 'MESSAGE_FETCH_SUCCESS',
  payload: messageData,
});

const getAllConversations = () => ({ type: 'GET_ALL_CONVERSATIONS' });

const setConversation = (id) => {
  return {
    type: 'SET_CONVERSATION',
    payload: {
      id,
    },
  };
};


export {
  getAllConversations,
  setConversation,
  fetchMessage,
};
