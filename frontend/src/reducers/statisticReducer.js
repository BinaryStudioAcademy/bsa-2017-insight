const initialState = {
  usersToRender: [],
  statisticById: null,
  activeStatisticsFilters: {},
  fieldsToDisplay: ['user name','first name', 'last name', 'currentUrl', 'city', 'country', 'browser'],
};

const statisticReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATISTICS_FILTER': {
      const newFilters = { ...state.activeStatisticsFilters, ...action.payload };
      return { ...state, activeStatisticsFilters: newFilters };
    }
    case 'GET_ALL_STATISTIC_SUCCESS':
      return Object.assign({}, state, { usersToRender: action.payload });
    case 'GET_STATISTIC_BY_ID_SUCCESS':
      return Object.assign({}, state, { statisticById: action.payload });
    case 'UPDATE_FIELDS':
      return Object.assign({}, state, { fieldsToDisplay: action.payload })
    default:
      return state;
  }
};

export default statisticReducer;
