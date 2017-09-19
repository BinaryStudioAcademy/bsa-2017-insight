const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERS_SUCCESS':
      console.log(action.payload);
      return Object.assign({}, state, { users: action.payload });
    default:
      return state;
  }
};

export default usersReducer;
