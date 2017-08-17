const initialState = {
  allData: [],
};

const statisticReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_STATISTIC_SUCCESS':
    {
      return Object.assign({}, state, { allData: action.payload });
    }
    default:
      return state;
  }
};

export default statisticReducer;
