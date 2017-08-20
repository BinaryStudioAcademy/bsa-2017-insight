const initialState = {
  currentUser: {}
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CURRENT_USER_SUCCESS': {
      return Object.assign({}, state, { currentUser: action.payload });
    }
    default:
      return state;
  }
};

export default currentUserReducer;

