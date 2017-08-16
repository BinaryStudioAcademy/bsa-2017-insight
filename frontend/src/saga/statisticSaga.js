
import { take, put } from 'redux-saga/effects';
import * as fetchAPI from "../components/admin/Respond/fetchAPI.js"

function* statisticSaga() {
   console.log("HELLO FROM  conversationsSaga")
 
   yield take('GET_STATISTIC_BY_ID');
   const result  = yield fetchAPI.getStatisticById()
   yield put({ type: 'GET_STATISTIC_BY_ID_SUCCESS', payload: result });
   
}

export default statisticSaga;






