import { fork } from 'redux-saga/effects';
import usersSaga from './usersSaga';
import statisticSaga from './statisticSaga';
import statisticByIdSaga from './statisticByIdSaga';
import conversationsSaga from './conversationsSaga';


function* rootSaga() {
  yield [
    fork(usersSaga),
    fork(statisticSaga),
    fork(statisticByIdSaga),
    fork(conversationsSaga)
  ];
  
export default rootSaga;
