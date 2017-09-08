const initialState = {
  conversations: [],
  conversationToRenderId: null,
};

function findConversationById(id, conversations) {
  if (!id || !conversations) return null;
  const conversationItem = conversations.find((conversation) => {
    return conversation._id === id;
  });
  const index = conversations.findIndex((conv) => {
    return conv._id === id;
  });
  return {
    conversationItem,
    index,
  };
}

const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MESSAGE_FETCH_SUCCESS': {
      const { index, conversationItem } = findConversationById(action.payload.conversationId, state.conversations);
      conversationItem.messages = [...conversationItem.messages, action.payload];
      const oldConversations = [...state.conversations];
      oldConversations.splice(index, 1, conversationItem);
      const newConversations = [...oldConversations];
      return { ...state, conversations: newConversations };
    }
    case 'GET_CONVERSATIONS_SUCCESS':
      return Object.assign({}, state, { conversations: action.payload });
    case 'GET_CONVERSATION_BY_ID_SUCCESS': {
      const { index } = findConversationById(action.payload.conversation._id, state.conversations);
      const oldConversation = [...state.conversations];
      oldConversation.splice(index, 1, action.payload.conversation);
      const newConversations = [...oldConversation];
      return { ...state, conversations: newConversations, conversationToRenderId: action.payload.id };
    }
    case 'REMOVE_CONVERSATION':
      return Object.assign({}, state, { conversationToRenderId: null });
    default: {
      return state;
    }
  }
};

export default conversationsReducer;

