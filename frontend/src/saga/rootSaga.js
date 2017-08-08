import { all } from 'redux-saga/effects';
import usersSaga from './usersSaga';

function* rootSaga() {
  yield all([usersSaga]);
}

export default rootSaga;
