const initialState = {
  data: [],
};

const statisticReducer = (state = initialState, action) => {
  console.log('STATISTIC REDUCER');
  switch (action.type) {
    case 'GET_STATISTIC_SUCCESS':
    {
    	console.log('data: action.payload');
    	console.log(action.payload);
      return Object.assign({}, state, { data: action.payload });
    }
    default:
      return state;
  }
};

export default statisticReducer;
