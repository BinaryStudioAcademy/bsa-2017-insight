
import { take, put } from 'redux-saga/effects';
import * as fetchAPI from "../components/admin/Respond/fetchAPI.js"

function* conversationsSaga() {
   console.log("HELLO FROM  conversationsSaga")
 
   yield take('GET_ALL_CONVERSATIONS');
   const result  = yield fetchAPI.getConversations()
   yield put({ type: 'GET_CONVERSATIONS_SUCCESS', payload: result });
   
}

export default conversationsSaga;






