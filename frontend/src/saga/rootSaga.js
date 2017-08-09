import { fork } from 'redux-saga/effects';
import usersSaga from './usersSaga';

function* rootSaga() {
  yield [fork(usersSaga)];
}

export default rootSaga;
