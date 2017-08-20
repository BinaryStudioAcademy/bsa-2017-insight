import { combineReducers } from 'redux';
import statisticReducer from './statisticReducer';
import conversationsReducer from './conversationsReducer';
import currentUserReducer from './currentUserReducer';

export default combineReducers({
  statistics: statisticReducer,
  conversationsInfo: conversationsReducer,
  currentUser: currentUserReducer
});
