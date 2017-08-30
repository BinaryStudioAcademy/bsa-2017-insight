import { takeEvery, put } from 'redux-saga/effects';
import * as fetchAPI from './../components/admin/FAQ/fetchAPI';

function* getAllFAQ() {
  const result = yield fetchAPI.getFAQ();
  yield put({ type: 'GET_FAQ_SUCCESS', payload: result });
}

function* getFAQById(action) {
  yield fetchAPI.getFAQById(action.payload.id);
  yield put({ type: 'GET_FAQ_BY_ID_SUCCESS' });
}

function* addFAQ(action) {
  const result = yield fetchAPI.addFAQ(action.payload.Body);
  yield put({ type: 'ADD_FAQ_SUCCESS', payload: result });
}

function* modifyFAQ(action) {
  yield fetchAPI.modifyFAQ(action.payload.id, action.payload.Body);
  yield put({ type: 'MODIFY_FAQ_SUCCESS', payload: action.payload });
}

function* deleteFAQ(action) {
  yield fetchAPI.deleteFAQ(action.payload.id);
  yield put({ type: 'DELETE_FAQ_SUCCESS', payload: action.payload.id });
}

function* setCurrentFAQ(action) {
  yield put({ type: 'SET_CURRENT_FAQ_SUCCESS', payload: action.payload });
}

function* faqSaga() {
  yield takeEvery('GET_FAQ', getAllFAQ);
  yield takeEvery('GET_FAQ_BY_ID', getFAQById);
  yield takeEvery('ADD_FAQ', addFAQ);
  yield takeEvery('MODIFY_FAQ', modifyFAQ);
  yield takeEvery('DELETE_FAQ', deleteFAQ);
  yield takeEvery('SET_CURRENT_FAQ', setCurrentFAQ);
}

export default faqSaga;
