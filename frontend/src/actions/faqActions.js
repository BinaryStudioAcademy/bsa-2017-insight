const getFAQ = () => {
  return {
    type: 'GET_FAQ',
  };
};

const addFAQ = (Body) => {
  return {
    type: 'ADD_FAQ',
    payload: {
      Body,
    },
  };
};

const deleteFAQ = (id) => {
  return {
    type: 'DELETE_FAQ',
    payload: {
      id,
    },
  };
};

const getFAQById = (id) => {
  return {
    type: 'GET_FAQ_BY_ID',
    payload: {
      id,
    },
  };
};

const modifyFAQ = (id, Body) => {
  return {
    type: 'MODIFY_FAQ',
    payload: {
      id,
      Body,
    },
  };
};

const setCurrentFAQ = (id) => {
  return {
    type: 'SET_CURRENT_FAQ',
    payload: {
      id,
    },
  };
};

export { getFAQ, addFAQ, deleteFAQ, getFAQById, modifyFAQ, setCurrentFAQ };
