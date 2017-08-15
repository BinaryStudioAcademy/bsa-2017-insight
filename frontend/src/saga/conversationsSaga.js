import { take, put } from 'redux-saga/effects';

function* conversationsSaga() {
  yield take('GET_ALL_CONVERSATIONS');
  yield put({ type: 'GET_CONVERSATIONS_SUCCESS', payload:["conversations"]});
}



export default usersSaga;
