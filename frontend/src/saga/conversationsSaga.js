
// import { take, put } from 'redux-saga/effects';
// import * as fetchAPI from "../components/admin/Respond/fetchAPI.js"

// function* conversationsSaga() {
//   console.log("HELLO FROM  conversationsSaga")
 
//   yield take('GET_ALL_CONVERSATIONS');
 
//   const result  = yield fetchAPI.getConversations()
//   yield put({ type: 'GET_CONVERSATIONS_SUCCESS', payload: result });
//    yield put({ type: 'GET_CONVERSATIONS_SUCCESS', payload: [{ id: 1, name: 'Sam' }, { id: 2, name: 'John' }] });
// }

// export default conversationsSaga;


import {takeEvery,takeLatest} from "redux-saga"
import { call, put } from 'redux-saga/effects';
import * as fetchAPI from "../components/admin/Respond/fetchAPI.js"


function* callAllConversation(){
  console.log("HELLO FROM  callAllConversation")
  const result = yield call(fetchAPI.getConversations)
  console.log(result)
  yield put ({type:"GET_CONVERSATIONS_SUCCESS",result})
}

function* conversationsSaga() {
 console.log("HELLO FROM  conversationsSaga")

  yield takeEvery("GET_ALL_CONVERSATIONS",callAllConversation);

}

export default conversationsSaga;



