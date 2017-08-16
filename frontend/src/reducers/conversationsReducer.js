const initialState = {
    conversations : [],
    conversationToRender: null
}

const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONVERSATIONS_SUCCESS':
      return Object.assign({}, state, { conversations: action.payload })
    case 'SET_CONVERSATION':
    
     const newState =  Object.assign({},state)
     newState.conversationToRender = action.payload 
    
      return newState
    default:
      return state;
  }
};

export default conversationsReducer;