const initialState = {
  mailchimpSettings: null,
};

const mailchimpSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MAILCHIMP_SETTINGS_SUCCESS': {
      return Object.assign({}, state, { mailchimpSettings: action.payload });
    }
    default: {
      return state;
    }
  }
};

export default mailchimpSettingsReducer;
