import { put, takeEvery } from 'redux-saga/effects';
import { DELETE_FORCE_MESSAGE, FETCH_FORCE_MESSAGES, CREATE_FORCE_MESSAGE } from '../actions/forceMessagesActions';

function fetchForceMessages() {
  const requestOptions = { credentials: 'include' };
  return fetch(`http://localhost:3000/api/force-messages/all/${window._injectedData.currentAppId}`, requestOptions)
    .then(response => response.json())
    .then(forceMessages => forceMessages);
}

function* getAllForceMessagesSaga() {
  const result = yield fetchForceMessages();
  yield put({ type: 'FETCH_FORCE_MESSAGES_SUCCESS', payload: result });
}

function* createForceMessageSaga(action) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(action.payload),
  };
  const result = yield fetch('http://localhost:3000/api/force-messages', requestOptions)
    .then(response => response.json())
    .then(data => data);
  if (result) yield put({ type: 'CREATE_FORCE_MESSAGE_LOCAL', payload: result });
}

function* deleteForceMessageSaga(action) {
  const requestOptions = {
    method: 'DELETE',
  };
  const result = yield fetch(`http://localhost:3000/api/force-messages/${action.id}`, requestOptions)
    .then(response => response);
  if (result.status === 200) yield put({ type: 'DELETE_FORCE_MESSAGE_LOCAL', payload: action.id });
}

function* watchForceMessages() {
  yield takeEvery(FETCH_FORCE_MESSAGES, getAllForceMessagesSaga);
  yield takeEvery(CREATE_FORCE_MESSAGE, createForceMessageSaga);
  yield takeEvery(DELETE_FORCE_MESSAGE, deleteForceMessageSaga);
}

export default watchForceMessages;
