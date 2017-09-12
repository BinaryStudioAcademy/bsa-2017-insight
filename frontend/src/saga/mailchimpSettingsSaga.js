import { takeEvery, put } from 'redux-saga/effects';

const fetchSettingsAPI = {
  getSettings: () => {
    return fetch(`${window._injectedData.insightHost}/api/mailchimp/settings`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(settings => settings)
      .catch(err => console.log(`Can't load the list of settings: ${err}`));
  },
  updateSettings: (body) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return fetch(`${window._injectedData.insightHost}/api/mailchimp/settings`, {
      credentials: 'include',
      method: 'put',
      headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then(data => data)
      .catch(err => console.log(`Houston, we'we got a problem: ${err}`));
  },
};

function* getSettings() {
  const result = yield fetchSettingsAPI.getSettings();
  yield put({ type: 'GET_MAILCHIMP_SETTINGS_SUCCESS', payload: result[0] });
}

function* updateSettings(action) {
  const result = yield fetchSettingsAPI.updateSettings(action.payload.body);
  yield put({ type: 'UPDATE_MAILCHIMP_SETTINGS_SUCCESS', payload: result });
}

export default function* selectionsSaga() {
  yield takeEvery('GET_MAILCHIMP_SETTINGS', getSettings);
  yield takeEvery('UPDATE_MAILCHIMP_SETTINGS', updateSettings);
}
