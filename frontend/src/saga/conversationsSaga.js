import { put, takeEvery } from 'redux-saga/effects';
import * as fetchAPI from './../components/admin/Respond/fetchAPI';

function* conversationsSaga() {
  const result = yield fetchAPI.getConversations();
  yield put({ type: 'GET_CONVERSATIONS_SUCCESS', payload: result });
}

function* setConversation(action) {
  const result = yield fetchAPI.getConversationById(action.payload);
  yield put({ type: 'GET_CONVERSATION_BY_ID_SUCCESS', payload: { id: action.payload, conversation: result } });
}

function* setFilters(action) {
  const result = yield fetchAPI.getConversationsByFilters(action.payload);
  yield put({ type: 'FILTERS_SET_SUCCESS', payload: { conversationFilters: action.payload, conversations: result } });
}

function* watchConversations() {
  yield takeEvery('GET_ALL_CONVERSATIONS', conversationsSaga);
  yield takeEvery('SET_CONVERSATION', setConversation);
  yield takeEvery('SET_CONVERSATION_FILTERS', setFilters);
}

export default watchConversations;
