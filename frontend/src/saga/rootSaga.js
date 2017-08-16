import { fork } from 'redux-saga/effects';
import usersSaga from './usersSaga';
import statisticSaga from "./statisticSaga"

function* rootSaga() {
  yield [
  fork(usersSaga),
  fork(statisticSaga)
  ];
 
}

export default rootSaga;
