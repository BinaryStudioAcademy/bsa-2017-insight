import { put, takeEvery } from 'redux-saga/effects';
import * as fetchAPI from './../components/admin/Respond/fetchAPI';

function* conversationsSaga() {
  const result = yield fetchAPI.getConversations();
  yield put({ type: 'GET_CONVERSATIONS_SUCCESS', payload: result });
}

// function* setConversation(action) {
//   const result = yield fetchAPI.getConversationById(action.payload);
//   yield put({ type: 'GET_CONVERSATION_BY_ID_SUCCESS', payload: { id: action.payload, conversation: result } });
// }


function* getConversationsByFilters(action) {
  const result = yield fetchAPI.getConversationsByFilters(action.payload);
  const convNum = {
    all: (yield fetchAPI.getConversationsByFilters(Object.assign({}, action.payload, { activeGroup: 'all' }))).length,
    mine: (yield fetchAPI.getConversationsByFilters(Object.assign({}, action.payload, { activeGroup: 'mine' }))).length,
    unpicked: (yield fetchAPI.getConversationsByFilters(Object.assign({}, action.payload, { activeGroup: 'unpicked' }))).length,
  };
  yield put({ type: 'UPDATE_CONVERSATIONS', payload: { conversations: result, conversationsNumber: convNum } });
}

function* watchConversations() {
  yield takeEvery('GET_ALL_CONVERSATIONS', conversationsSaga);
  // yield takeEvery('SET_CONVERSATION', setConversation);
  yield takeEvery('GET_CONVERSATIONS_BY_FILTERS', getConversationsByFilters);
}

export default watchConversations;
