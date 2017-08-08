import { take, put } from 'redux-saga/effects';

function* usersSaga() {
  yield take('GET_ALL_USERS');
  // что-то асинхронное
  setTimeout(() => {
    put({ type: 'GET_USERS_SUCCESS', payload: [{ id: 1, name: 'Sam' }, { id: 2, name: 'John' }] });
  }, 2000);
}

export default usersSaga;
