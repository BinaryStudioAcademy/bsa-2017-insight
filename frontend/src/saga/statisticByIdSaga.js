import { take, put } from 'redux-saga/effects';
import * as fetchAPI from './../components/analytics/getStatistics';

function* statisticSaga() {
  const action = yield take('GET_STATISTIC_BY_ID');
  const result = yield fetchAPI.fetchStatisticById(action.payload.id);
  console.log('Result in saga:', result);
  yield put({ type: 'GET_STATISTIC_BY_ID_SUCCESS', payload: result });
}

export default statisticByIdSaga;
