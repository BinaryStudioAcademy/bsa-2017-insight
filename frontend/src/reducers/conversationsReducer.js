const initialState = {
  conversations: [],
  conversationToRenderId: null,
  conversationFilters: {
    date: {},
    activeGroup: 'all',
    activeDateFilter: 'range',
    isFilterApplied: false,
  },
  unreadMessages: window._injectedData.unreadMessages,
  reassignedConversations: window._injectedData.reassignedConversations,
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
    case 'UPDATE_CONVERSATIONS':
      return Object.assign({}, state, { conversations: action.payload });
    case 'SET_CONVERSATION_FILTERS': {
      return Object.assign({}, state, { conversationFilters: action.payload });
    }
    case 'SET_CONVERSATION': {
      return Object.assign({}, state, { conversationToRenderId: action.payload });
    }
    case 'NAVIGATE_TO_CONVERSATION': {
      if (action.payload.group) {
        const filters = { ...state.conversationFilters };
        filters.activeGroup = action.payload.group;
        return Object.assign({}, state, {
          conversationFilters: filters,
          conversationToRenderId: action.payload.id,
          conversations: [],
        });
      } else {
        return Object.assign({}, state, {
          conversationToRenderId: action.payload.id,
        });
      }
    }
    case 'SET_REASSIGN_TO_FALSE': {
      const conversations = [...state.conversations];
      conversations.forEach((conversation, index) => {
        if (conversation._id === action.payload) {
          conversations[index].isReassigned = false;
        }
      });
      return Object.assign({}, state, { conversations });
    }
    case 'UPDATE_UNREAD_MESSAGES': {
      return Object.assign({}, state, { unreadMessages: [...action.payload] });
    }
    case 'UPDATE_REASSIGNED_CONVERSATIONS': {
      return Object.assign({}, state, { reassignedConversations: [...action.payload] });
    }
    case 'SET_MESSAGES_RECEIVED': {
      const oldConversations = [...state.conversations];
      const newConversations = oldConversations.map((conversation) => {
        if (conversation._id !== action.payload) {
          return conversation;
        }
        conversation.messages.forEach((message, index) => {
          conversation.messages[index].isReceived = true;
        });
        return conversation;
      });
      return Object.assign({}, state, { conversations: newConversations });
    }
    default: {
      return state;
    }
  }
};

export default conversationsReducer;

