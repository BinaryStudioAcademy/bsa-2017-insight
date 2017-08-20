import { fork } from 'redux-saga/effects';
import statisticSaga from './statisticSaga';
import conversationsSaga from './conversationsSaga';
import getCurrentUserSaga from './currentUserSaga';


function* rootSaga() {
  yield [
    fork(statisticSaga),
    fork(conversationsSaga),
    fork(getCurrentUserSaga)
  ];
}


export default rootSaga;
