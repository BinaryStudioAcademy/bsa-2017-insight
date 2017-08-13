const initialState = {
  users: [],
  admin: null,
};

function findConversationById(id, conversations) {
  if (!id || !conversations) return null;
  const item = conversations.find((conversation) => {
    return conversation._id === id;
  });
  const index = conversations.findIndex((conv) => {
    return conv._id === id;
  });
  return {
    item,
    index,
  };
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERS_SUCCESS':
      console.log(action.payload);
      return Object.assign({}, state, { users: action.payload });
    case 'USER_FETCH_SUCCESS':
      return {
        admin: action.payload,
      };
    case 'MESSAGE_FETCH_SUCCESS':
      const conversation = findConversationById(action.payload.conversationId, state.admin.conversations).item;
      conversation.messages = [...conversation.messages, action.payload];
      const oldConversations = [...state.admin.conversations];
      oldConversations.splice(conversation.index, 1);
      const newConversations = [...oldConversations, conversation];
      const newAdmin = Object.assign({}, state.admin, { conversations: newConversations });
      return {
        admin: newAdmin,
      };
    default:
      return state;
  }
};

export default usersReducer;
