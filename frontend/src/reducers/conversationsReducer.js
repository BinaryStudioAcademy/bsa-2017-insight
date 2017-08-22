const initialState = {
  conversations: [],
  conversationToRenderId: null,
  forceConvId: null,
  forceConv: null
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

const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MESSAGE_FETCH_SUCCESS': {
      const { index, conversationItem } = findConversationById(action.payload.conversationId, state.conversations);
      conversationItem.messages = [...conversationItem.messages, action.payload];
      const oldConversations = [...state.conversations];
      oldConversations.splice(index, 1);
      const newConversations = [...oldConversations, conversationItem];
      return { ...state, conversations: newConversations };
    }
    case 'GET_CONVERSATIONS_SUCCESS':
      return Object.assign({}, state, { conversations: action.payload });
    case 'SET_CONVERSATION': {
      return { ...state, conversationToRenderId: action.payload };
    }
    case 'REMOVE_CONVERSATION':
      return Object.assign({}, state, { conversationToRenderId: null });
    case 'SET_FRORCE_CONV_ID':
      return Object.assign({}, state, { forceConvId: action.payload.id, forceConv: action.payload.newConversations });
    default: {
      return state;
    }
  }
};

export default conversationsReducer;

