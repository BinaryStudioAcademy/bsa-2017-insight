import { fork } from 'redux-saga/effects';
import statisticSaga from './statisticSaga';
import conversationsSaga from './conversationsSaga';
import getCurrentUserSaga from './currentUserSaga';
import selectionsSaga from './selectionsSaga';
import faqSaga from './faqSaga';
import appsSaga from './appsSaga';


function* rootSaga() {
  yield [
    fork(statisticSaga),
    fork(conversationsSaga),
    fork(getCurrentUserSaga),
    fork(selectionsSaga),
    fork(faqSaga),
    fork(appsSaga),
  ];
}


export default rootSaga;
