const initialState = {
  selections: [],
  chosenSelection: null,
};

const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_SELECTIONS_SUCCESS': {
      return Object.assign({}, state, { selections: action.payload });
    }
    case 'GET_SINGLE_SELECTION_SUCCESS': {
      return Object.assign({}, state, { chosenSelection: action.payload });
    }
    default: {
      return state;
    }
  }
};

export default conversationsReducer;
