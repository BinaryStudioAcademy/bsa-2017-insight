const initialState = {
  allForceMessages: [],
};

const forceMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FORCE_MESSAGES_SUCCESS': {
      return { ...state, allForceMessages: action.payload };
    }
    case 'CREATE_FORCE_MESSAGE_LOCAL': {
      const newForceMessages = [...state.allForceMessages, action.payload];
      return { ...state, allForceMessages: newForceMessages };
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
