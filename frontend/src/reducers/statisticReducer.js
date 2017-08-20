const initialState = {
  allData: [],
  statisticById: null
};

const statisticReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_STATISTIC_SUCCESS':
      return Object.assign({}, state, { allData: action.payload });
    case 'GET_STATISTIC_BY_ID_SUCCESS':
      return Object.assign({}, state, { statisticById: action.payload });
    default:
      return state;
  }
};

export default statisticReducer;
