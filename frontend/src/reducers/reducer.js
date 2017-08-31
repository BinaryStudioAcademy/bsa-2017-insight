import { combineReducers } from 'redux';
import statisticReducer from './statisticReducer';
import conversationsReducer from './conversationsReducer';
import currentUserReducer from './currentUserReducer';
import selectionReducer from './selectionReducer';

export default combineReducers({
  statistics: statisticReducer,
  conversationsInfo: conversationsReducer,
  currentUser: currentUserReducer,
  selection: selectionReducer,
});
