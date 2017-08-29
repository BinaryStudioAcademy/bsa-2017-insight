import { fork } from 'redux-saga/effects';
import statisticSaga from './statisticSaga';
import conversationsSaga from './conversationsSaga';
import faqSaga from './faqSaga';


function* rootSaga() {
  yield [
    fork(statisticSaga),
    fork(conversationsSaga),
    fork(faqSaga)
  ];
}


export default rootSaga;
