import { takeEvery, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

function* getCurrentUser() {
  let counter = 0;
  while (!window._injectedData) {
    yield delay(500);
    counter += 1;
    if (counter === 10) break;
  }
  if (counter < 10) {
    const result = window._injectedData;
    console.log('GET_CURRENT_USER_SUCCESS');
    console.log('_injectedData at the moment is:');
    console.log(result);
    yield put({ type: 'GET_CURRENT_USER_SUCCESS', payload: result });
  } else {
    console.log('GET_CURRENT_USER_FAILURE');
    yield put({ type: 'GET_CURRENT_USER_FAILURE' });
  }
}

export default function* currentUserSaga() {
  yield takeEvery('GET_CURRENT_USER', getCurrentUser);
}
