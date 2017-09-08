const initialState = {
  apps: [],
  chosenApp: null,
};

const appsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_APPS_SUCCESS': {
      return Object.assign({}, state, { apps: action.payload });
    }
    case 'GET_SINGLE_APP_SUCCESS': {
      return Object.assign({}, state, { chosenApp: action.payload });
    }
    case 'TOGGLE_APP_SUCCESS': {
      return Object.assign({}, state, { chosenApp: action.payload });
    }
    default: {
      return state;
    }
  }
};

export default appsReducer;
