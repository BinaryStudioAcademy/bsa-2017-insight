const initialState = {
   statisticById:[]
}

const statisticReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_STATISTIC_BY_ID_SUCCESS':
      return Object.assign({}, state, { statisticById: action.payload })
    default:
      return state;
  }
};

export default statisticReducer;