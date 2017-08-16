import { fork } from 'redux-saga/effects';
import usersSaga from './usersSaga';
import conversationsSaga from './conversationsSaga';
import statisticSaga from "./statisticSaga"

function* rootSaga() {
   console.log("HELLO FROM rootSaga")
  yield [fork(usersSaga),fork(conversationsSaga),fork(statisticSaga)];
 
}

export default rootSaga;
