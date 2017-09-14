const fetchMessage = messageData => ({
  type: 'MESSAGE_FETCH_SUCCESS',
  payload: messageData,
});

const getAllConversations = () => ({ type: 'GET_ALL_CONVERSATIONS' });

const setConversation = (id) => {
  return {
    type: 'SET_CONVERSATION',
    payload: id,
  };
};

const removeConversations = () => {
  return {
    type: 'REMOVE_CONVERSATION',
  };
};

const updateConversations = (conversations) => {
  return {
    type: 'UPDATE_CONVERSATIONS',
    payload: conversations,
  };
};

export {
  getAllConversations,
  setConversation,
  fetchMessage,
  removeConversations,
  updateConversations,
};
