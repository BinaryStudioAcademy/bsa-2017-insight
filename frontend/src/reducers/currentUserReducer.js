const initialState = {
  currentUser: {}
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CURRENT_USER_SUCCESS': {
      console.log('state');
      console.log(state);
      console.log('action payload');
      console.log(action.payload);
      const newState = Object.assign({}, state, { currentUser: action.payload });
      console.log('new state');
      console.log(newState);
      return newState;
    }
    default:
      return state;
  }
};

export default currentUserReducer;

