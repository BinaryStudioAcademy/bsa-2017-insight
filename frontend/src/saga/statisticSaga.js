import { takeEvery, put } from 'redux-saga/effects';
import * as fetchAPI from './../components/analytics/getStatistics';


function* fetchStatistic(action) {
  const result = yield fetchAPI.getStatisticById(action.payload.id);
  console.log('Result in saga:', result);
  yield put({ type: 'GET_STATISTIC_BY_ID_SUCCESS', payload: result });
}

function* statisticAllSaga(action) {
  const result = yield fetchAPI.getStatisticsByQuery(action.query);
  yield put({ type: 'GET_ALL_STATISTIC_SUCCESS', payload: result });
}

function* statisticSaga() {
  yield takeEvery('GET_STATISTIC_BY_ID', fetchStatistic);
  yield takeEvery('GET_ALL_STATISTIC', statisticAllSaga);
}

export default statisticSaga;
