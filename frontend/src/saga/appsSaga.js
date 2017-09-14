import { takeEvery, put } from 'redux-saga/effects';

const fetchSelectionAPI = {
  allApps: () => {
    return fetch(`${window._injectedData.insightHost}/api/apps`)
      .then(res => res.json())
      .then(apps => apps)
      .catch(err => console.log(`Can't load a list of apps: ${err}`));
  },
  singleApp: (id) => {
    return fetch(`${window._injectedData.insightHost}/api/apps/${id}`)
      .then(res => res.json())
      .then(app => app)
      .catch(err => console.log(`Can't load a single app: ${err}`));
  },
  toggleApp: (id) => {
    return fetch(`${window._injectedData.insightHost}/api/apps/${id}/toggle`, {
      method: 'put',
    })
      .then(res => res.json())
      .then(res => res)
      .catch(err => console.log(`Can't toggle app's state: ${err}`));
  },
};

function* getAllApps() {
  const result = yield fetchSelectionAPI.allApps();
  yield put({ type: 'GET_ALL_APPS_SUCCESS', payload: result });
}

function* getSingleApp(action) {
  const result = yield fetchSelectionAPI.singleApp(action.payload.id);
  yield put({ type: 'GET_SINGLE_APP_SUCCESS', payload: result });
}

function* toggleAppState(action) {
  const result = yield fetchSelectionAPI.toggleApp(action.payload.id);
  yield put({ type: 'TOGGLE_APP_SUCCESS', payload: result });
}

export default function* selectionsSaga() {
  yield takeEvery('GET_ALL_APPS', getAllApps);
  yield takeEvery('GET_SINGLE_APP', getSingleApp);
  yield takeEvery('TOGGLE_APP', toggleAppState);
}
