import { fork } from 'redux-saga/effects';
import statisticSaga from './statisticSaga';
import conversationsSaga from './conversationsSaga';


function* rootSaga() {
  yield [
    fork(statisticSaga),
    fork(conversationsSaga),
  ];
}


export default rootSaga;
