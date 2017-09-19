const getMailchimpSettings = () => {
  return {
    type: 'GET_MAILCHIMP_SETTINGS',
  };
};

const updateMailchimpSettings = (body) => {
  return {
    type: 'UPDATE_MAILCHIMP_SETTINGS',
    payload: { body },
  };
};

export { getMailchimpSettings, updateMailchimpSettings };
