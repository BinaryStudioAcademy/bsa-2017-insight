import { combineReducers } from 'redux';
import statisticReducer from './statisticReducer';
import conversationsReducer from './conversationsReducer';
import faqReducer from './faqReducer';

export default combineReducers({
  statistics: statisticReducer,
  conversationsInfo: conversationsReducer,
  faq: faqReducer,
});