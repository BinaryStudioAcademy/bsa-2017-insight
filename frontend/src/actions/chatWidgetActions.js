const setActiveChat = (id) => {
  return {
    type: 'SET_ACTIVE_CHAT_ID',
    payload: id
  };
};

const removeActiveChat = () => {
  return {
    type: 'REMOVE_ACTIVE_CHAT_ID'
  };
};

const setAllConversations = (conversations) => {
  return {
    type: 'SET_ALL_USER_CONVERSATIONS',
    payload: conversations
  };
};

const newConversationCreated = (conversations, activeChatId) => {
  return {
    type: 'NEW_CONVERSATION_CREATED',
    payload: { conversations, activeChatId }
  };
};

const setForceConvId = (id, newConversations) => {
  return {
    type: 'SET_FRORCE_CONV_ID',
    payload: {
      id,
      newConversations
    }
  };
};

const newMessage = (message) => {
  return {
    type: 'NEW_MESSAGE',
    payload: message
  };
};

export { setForceConvId, setAllConversations, newConversationCreated, setActiveChat, removeActiveChat, newMessage }