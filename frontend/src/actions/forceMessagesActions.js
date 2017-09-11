export const FETCH_FORCE_MESSAGES = 'FETCH_FORCE_MESSAGES';
export const DELETE_FORCE_MESSAGE = 'DELETE_FORCE_MESSAGE';
export const CREATE_FORCE_MESSAGE = 'CREATE_FORCE_MESSAGE';

const fetchForceMessages = () => ({ type: FETCH_FORCE_MESSAGES });

const createForceMessage = data => ({
  type: CREATE_FORCE_MESSAGE,
  payload: data,
});

const deleteForceMessage = id => ({
  type: DELETE_FORCE_MESSAGE,
  id,
});

export { fetchForceMessages, deleteForceMessage, createForceMessage };
