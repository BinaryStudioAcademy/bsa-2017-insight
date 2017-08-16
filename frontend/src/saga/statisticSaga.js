
import { take, put } from 'redux-saga/effects';
import * as fetchAPI from "../components/analytics/getStatistics.js"

function* statisticSaga() {
   console.log("statisticSaga")
 
   yield take('GET_STATISTIC');
   const result  = yield fetchAPI.fetchStatistic();
   console.log("after FetchAPI");
   console.log(result);
   yield put({ type: 'GET_STATISTIC_SUCCESS', payload: {a: "asdgja"} });
   
}

export default statisticSaga;










// import { take, put } from 'redux-saga/effects';
// import fetchStatistic from "../components/analytics/getStatistics.js"

// function* getStatisticSaga() {
//    console.log("getStatisticSaga")
//    const result  = yield fetchStatistic()
//    yield put({ type: 'GET_STATISTIC_SUCCESS', payload: result });
   
// }

// function* getStatisticByIdSaga() {
//    yield put({ type: 'GET_STATISTIC_BY_ID_SUCCESS'});
   
// }


// function* statisticSaga() {
//    console.log("statistic Saga")
//    yield take('GET_STATISTIC', getStatisticSaga());
//    yield take('GET_STATISTIC_BY_ID', getStatisticByIdSaga());   
// }


// export default statisticSaga;





