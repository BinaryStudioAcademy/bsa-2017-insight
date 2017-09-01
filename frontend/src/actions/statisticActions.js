const getAllStatistics = (query) => {
  return {
    type: 'GET_ALL_STATISTIC',
    query,
  };
};

const getStatisticById = (id) => {
  return {
    type: 'GET_STATISTIC_BY_ID',
    payload: {
      id
    }
  };
};

const setStatisticsFilter = filters => ({
  type: 'SET_STATISTICS_FILTER',
  payload: filters,
});

export { getStatisticById, getAllStatistics, setStatisticsFilter };
