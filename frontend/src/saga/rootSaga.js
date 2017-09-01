import { fork } from 'redux-saga/effects';
import statisticSaga from './statisticSaga';
import conversationsSaga from './conversationsSaga';
import getCurrentUserSaga from './currentUserSaga';
import selectionsSaga from './selectionsSaga';
import faqSaga from './faqSaga';


function* rootSaga() {
  yield [
    fork(statisticSaga),
    fork(conversationsSaga),
    fork(getCurrentUserSaga),
    fork(selectionsSaga),
    fork(faqSaga)
  ];
}


export default rootSaga;
