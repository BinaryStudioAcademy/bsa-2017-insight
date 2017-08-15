import { combineReducers } from 'redux'
import usersReducer from './usersReducer'
import conversationsReducer from './conversationsReducer'

export default combineReducers({
 userState: usersReducer,
 conversationsState: conversationsReducer
})