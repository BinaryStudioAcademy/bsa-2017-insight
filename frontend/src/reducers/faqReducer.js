const initialState = {
  data: [],
  currentQuestion: {}
};

const faqReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FAQ_SUCCESS':
      return Object.assign({}, state, { data: action.payload });
    case 'GET_FAQ_BY_ID_SUCCESS':
      return Object.assign({}, state, { currentQuestion: action.payload });
    case 'ADD_FAQ_SUCCESS':
      return Object.assign({}, state, { data: [...state.data, action.payload], currentQuestion: action.payload });
    case 'MODIFY_FAQ_SUCCESS':
    {
      return Object.assign({}, state);
    }
    case 'DELETE_FAQ_SUCCESS':
    {
      const newData = [...state.data];
      let index;
      for (let i = 0; i < newData.length; i++) {
        (newData[i]._id === action.payload) ? index = i : index = -1;
      };
      if (index != -1)
        newData.splice(index, 1);
      return Object.assign({}, state, { data: newData });
    }
    default:
      return state;
  }
};

export default faqReducer;
