const getStatistic = () => {
  return {
    type: 'GET_STATISTIC',
  }
}

const getStatisticById = (id) => {
  return {
    type: 'GET_STATISTIC_BY_ID',
    payload: {
      id,
    },
  };
};

export { getStatisticById, getStatistic };
