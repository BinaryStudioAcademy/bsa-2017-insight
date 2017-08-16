import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import conversationsReducer from './conversationsReducer';
import statisticReducer from "./statisticReducer"

export default combineReducers({
 userState: usersReducer,
 conversationsState: conversationsReducer,
 statisticState : statisticReducer
})