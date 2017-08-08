import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import usersReducer from './reducers/usersReducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(usersReducer, applyMiddleware(sagaMiddleware));

export { store, sagaMiddleware };
