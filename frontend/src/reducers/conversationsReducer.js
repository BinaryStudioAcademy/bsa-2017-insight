const initialState = {
    conversations : [],
    conversationToRender: null
}

const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONVERSATIONS_SUCCESS':
      console.log(action.payload);
      return Object.assign({}, state, { conversations: action.payload });
    default:
      return state;
  }
};

export default conversationsReducer;