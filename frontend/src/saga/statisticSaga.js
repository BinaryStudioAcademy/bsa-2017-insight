import { takeEvery, put } from 'redux-saga/effects';
import * as fetchAPI from './../components/analytics/getStatistics';


function* fetchStatistic(action) {
  const result = yield fetchAPI.getStatisticById(action.payload.id);
  yield put({ type: 'GET_STATISTIC_BY_ID_SUCCESS', payload: result });
}

function* statisticAllSaga() {
  const result = yield fetchAPI.getAllStatistic();
  yield put({ type: 'GET_ALL_STATISTIC_SUCCESS', payload: result });
}

function* statisticSaga() {
  yield takeEvery('GET_STATISTIC_BY_ID', fetchStatistic);
  yield takeEvery('GET_ALL_STATISTIC', statisticAllSaga);
}

export default statisticSaga;
