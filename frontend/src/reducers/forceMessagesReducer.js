const initialState = {
  allForceMessages: [],
};

function updateMessage(oldMessage, updateData) {
  const newMessage = { ...oldMessage };
  newMessage.body = updateData.body;
  newMessage.timer = updateData.timer;
  return newMessage;
}

const forceMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FORCE_MESSAGES_SUCCESS': {
      return { ...state, allForceMessages: action.payload };
    }
    case 'CREATE_FORCE_MESSAGE_LOCAL': {
      const newForceMessages = [...state.allForceMessages, action.payload];
      return { ...state, allForceMessages: newForceMessages };
    }
    case 'UPDATE_FORCE_MESSAGE': {
      const oldForceMessages = [...state.allForceMessages];
      const oldMessage = oldForceMessages.find(forceMessage => forceMessage.page === action.payload.page);
      const oldMessageIndex = oldForceMessages.findIndex(forceMessage => forceMessage.page === action.payload.page);
      const updatedMessage = updateMessage(oldMessage, action.payload);
      oldForceMessages.splice(oldMessageIndex, 1, updatedMessage);
      return { ...state, allForceMessages: oldForceMessages };
    }
    case 'DELETE_FORCE_MESSAGE_LOCAL': {
      const oldForceMessages = [...state.allForceMessages];
      const newForceMessages = oldForceMessages.filter(forceMessage => forceMessage._id !== action.payload);
      return { ...state, allForceMessages: newForceMessages };
    }
    default: {
      return state;
    }
  }
};

export default forceMessagesReducer;
