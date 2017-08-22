import { combineReducers } from 'redux';
import statisticReducer from './statisticReducer';
import conversationsReducer from './conversationsReducer';
import chatWidgetReducer from './chatWidgetReducer';

export default combineReducers({
  statistics: statisticReducer,
  conversationsInfo: conversationsReducer,
  chatWidgetInfo: chatWidgetReducer
});
