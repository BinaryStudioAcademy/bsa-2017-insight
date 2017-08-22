const initialState = {

  forceConvId: null,
  conversations: [],
  activeChatId: null
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
    index
  };
}

const chatWidgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FRORCE_CONV_ID':
      return Object.assign({}, state, {
        forceConvId: action.payload.id,
        activeChatId: action.payload.id,
        conversations: action.payload.newConversations });
    case 'SET_ACTIVE_CHAT_ID':
      return Object.assign({}, state, { activeChatId: action.payload });
    case 'REMOVE_ACTIVE_CHAT_ID':
      return Object.assign({}, state, { activeChatId: null });
    case 'SET_ALL_USER_CONVERSATIONS':
      return Object.assign({}, state, { conversations: action.payload });
    case 'NEW_CONVERSATION_CREATED':
      return Object.assign({}, state, {
        conversations: action.payload.conversations,
        activeChatId: action.payload.activeChatId });
    case 'NEW_MESSAGE': {
      const { conversationItem, index } = findConversationById(action.payload.conversationId, state.conversations);
      const oldConversations = [...state.conversations];
      if (index === -1) return state;
      oldConversations.splice(index, 1);
      conversationItem.messages = [...conversationItem.messages, action.payload];
      const newConversations = [...oldConversations, conversationItem];
      return { ...state, conversations: newConversations };
    }
    default: {
      return state;
    }
  }
};

export default chatWidgetReducer;

