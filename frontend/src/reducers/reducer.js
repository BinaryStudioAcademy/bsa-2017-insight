import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import statisticReducer from './statisticReducer';

export default combineReducers({
  userState: usersReducer,
  statisticState: statisticReducer,
});
