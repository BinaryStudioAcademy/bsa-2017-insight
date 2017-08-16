
import { take, put } from 'redux-saga/effects';
import * as fetchAPI from "../components/analytics/getStatistics"

function* statisticSaga() {
   console.log("HELLO FROM  conversationsSaga")
  
   const action = yield take('GET_STATISTIC_BY_ID');
   const result  = yield fetchAPI.getStatisticById(action.payload.id)
   console.log(result,"result")
   yield put({ type: 'GET_STATISTIC_BY_ID_SUCCESS', payload: {id:result} });
   
}

export default statisticSaga;






