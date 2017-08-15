const initialState = {
    conversations : [],
    conversationToRender: null
}

const conversationsReducer = (state = initialState, action) => {
   console.log("FROM REDUCER")
  switch (action.type) {
    case 'GET_ALL_CONVERSATIONS':
      console.log(action.type);
      console.log(action.payload);
      return Object.assign({}, state, { conversations: action.payload });
    case "GET_CONVERSATIONS_SUCCESS":
      console.log(action)
    default:
      return state;
  }
};

export default conversationsReducer;