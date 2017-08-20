import { takeEvery, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

function* getCurrentUser() {
  let counter = 0;
  console.log(window._injectedData);
  while (!window._injectedData) {
    yield delay(100);
    counter += 1;
    if (counter === 10) break;
  }
  if (counter < 10) {
    const result = window._injectedData;
    yield put({ type: 'GET_CURRENT_USER_SUCCESS', payload: result });
  } else {
    yield put({ type: 'GET_CURRENT_USER_FAILURE' });
  }
  console.log(`counter: ${counter}`);
}

export default function* currentUserSaga() {
  yield takeEvery('GET_CURRENT_USER', getCurrentUser);
}
