import { fork } from 'redux-saga/effects';
import usersSaga from './usersSaga';
import conversationsSaga from './conversationsSaga';

function* rootSaga() {
   console.log("HELLO FROM rootSaga")
  yield [fork(usersSaga),fork(conversationsSaga)];
 
}

export default rootSaga;
