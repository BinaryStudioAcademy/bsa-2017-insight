import { take, put } from 'redux-saga/effects';
import * as fetchAPI from '../components/analytics/getStatistics';

function* statisticSaga() {
  yield take('GET_STATISTIC');
  const result = yield fetchAPI.fetchStatistic();
  yield put({ type: 'GET_STATISTIC_SUCCESS', payload: result });
}

export default statisticSaga;
