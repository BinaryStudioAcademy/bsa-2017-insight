import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import statisticReducer from './statisticReducer';
import statisticByIdReducer from './statisticReducer';
import conversationsReducer from './conversationsReducer';

export default combineReducers({
  userState: usersReducer,
  allStatistics: statisticReducer,
  userStatistics: statisticByIdReducer,
  conversationsInfo: conversationsReducer,
});
