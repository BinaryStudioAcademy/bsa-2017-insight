import { put, takeEvery } from 'redux-saga/effects';
import { DELETE_FORCE_MESSAGE, FETCH_FORCE_MESSAGES, CREATE_FORCE_MESSAGE } from '../actions/forceMessagesActions';

function fetchForceMessages() {
  const requestOptions = { credentials: 'include' };
  return fetch(`${window._injectedData.insightHost}/api/force-messages/all/${window._injectedData.currentAppId}`, requestOptions)
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
  const result = yield fetch(`${window._injectedData.insightHost}/api/force-messages`, requestOptions)
    .then((response) => {
      if (response.status === 204) {
        return null;
      }
      return response.json();
    })
    .then(data => data);
  if (result) {
    yield put({ type: 'CREATE_FORCE_MESSAGE_LOCAL', payload: result });
  } else {
    yield put({ type: 'UPDATE_FORCE_MESSAGE', payload: action.payload });
  }
}

function* deleteForceMessageSaga(action) {
  const requestOptions = {
    method: 'DELETE',
  };
  const result = yield fetch(`${window._injectedData.insightHost}/api/force-messages/${action.id}`, requestOptions)
    .then(response => response);
  if (result.status === 200) yield put({ type: 'DELETE_FORCE_MESSAGE_LOCAL', payload: action.id });
}

function* watchForceMessages() {
  yield takeEvery(FETCH_FORCE_MESSAGES, getAllForceMessagesSaga);
  yield takeEvery(CREATE_FORCE_MESSAGE, createForceMessageSaga);
  yield takeEvery(DELETE_FORCE_MESSAGE, deleteForceMessageSaga);
}

export default watchForceMessages;
