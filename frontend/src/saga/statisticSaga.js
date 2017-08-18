// import { take, put } from 'redux-saga/effects';


// function* statisticSaga() {
//   const action = yield take('GET_STATISTIC_BY_ID');
//   const result = yield fetchAPI.getStatisticById(action.payload.id);
//   console.log('Result in saga:', result);
//   yield put({ type: 'GET_STATISTIC_BY_ID_SUCCESS', payload: result });
// }


import { takeEvery, put } from 'redux-saga/effects';
import * as fetchAPI from './../components/analytics/getStatistics';


function* fetchStatistic(action) {
  const result = yield fetchAPI.getStatisticById(action.payload.id);
  console.log('Result in saga:', result);
  yield put({ type: 'GET_STATISTIC_BY_ID_SUCCESS', payload: result });
}

function* statisticSaga() {
  yield takeEvery('GET_STATISTIC_BY_ID', fetchStatistic);
}

export default statisticSaga;
