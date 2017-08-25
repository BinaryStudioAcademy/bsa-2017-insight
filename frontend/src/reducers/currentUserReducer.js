const initialState = {
  currentUser: {}
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CURRENT_USER_SUCCESS': {
      const newState = Object.assign({}, state, { currentUser: action.payload });
      return newState;
    }
    default:
      return state;
  }
};

export default currentUserReducer;

