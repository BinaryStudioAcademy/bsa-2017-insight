const getAllSelections = () => {
  return {
    type: 'GET_ALL_SELECTIONS',
  };
};

const getSingleSelection = (id) => {
  return {
    type: 'GET_SINGLE_SELECTION',
    payload: { id },
  };
};

const addSelection = (body, cb) => {
  return {
    type: 'ADD_SELECTION',
    payload: { body, cb },
  };
};

const deleteSelection = (id, cb) => {
  return {
    type: 'DELETE_SELECTION',
    payload: { id, cb },
  };
};

export { getAllSelections, getSingleSelection, addSelection, deleteSelection };
