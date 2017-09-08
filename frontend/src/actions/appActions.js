const getAllApps = () => {
  return {
    type: 'GET_ALL_APPS',
  };
};

const getSingleApp = (id) => {
  return {
    type: 'GET_SINGLE_APP',
    payload: { id },
  };
};

const toggleApp = (id) => {
  return {
    type: 'TOGGLE_APP',
    payload: { id },
  };
};

export { getAllApps, getSingleApp, toggleApp };
