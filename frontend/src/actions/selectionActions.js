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

const addSelection = (body) => {
  return {
    type: 'ADD_SELECTION',
    payload: { body },
  };
};

const deleteSelection = (id) => {
  return {
    type: 'DELETE_SELECTION',
    payload: { id },
  };
};

export { getAllSelections, getSingleSelection, addSelection, deleteSelection };
