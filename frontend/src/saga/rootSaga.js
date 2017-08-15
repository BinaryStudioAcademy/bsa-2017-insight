import { fork } from 'redux-saga/effects';
import usersSaga from './usersSaga';
import conversationsSaga from './conversationsSaga';

function* rootSaga() {
  yield [fork(usersSaga)];
  yield [fork(conversationsSaga)];
}

export default rootSaga;
