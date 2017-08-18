import { fork } from 'redux-saga/effects';
import usersSaga from './usersSaga';
import conversationsSaga from './conversationsSaga';
import statisticSaga from './statisticSaga';

function* rootSaga() {
  yield [fork(usersSaga), fork(conversationsSaga), fork(statisticSaga)];
}

export default rootSaga;
