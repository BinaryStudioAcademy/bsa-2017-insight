const initialState = {
  statisticById: null,
};

const statisticByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_STATISTIC_BY_ID_SUCCESS':
      return Object.assign({}, state, { statisticById: action.payload });
    default:
      return state;
  }
};

export default statisticByIdReducer;
