// import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
// import { Provider } from 'react-redux';
// import { store, sagaMiddleware } from '../../store';
// import rootSaga from '../../saga/rootSaga';
import ChatWidget from './chatWidget/ChatWidget';
import '../analytics/analytics';

// TEMPORARY PLACEHOLDER
if (!window._injectedData || Object.keys(window._injectedData) < 2) {
  window._injectedData = {
    _id: '59a2e2f159a1e6202aaf06c3',
    userId: {
      _id: '59a2e2f159a1e6202aaf06c2',
      firstName: 'undefined',
      email: 'artem.m.manukyan@gmail.com',
      avatar: 'Outlander-1503847153084.jpeg',
      conversations: [],
      username: 'Outlander',
    },
    viewedUrls: [],
  };
}

// sagaMiddleware.run(rootSaga);

WebFont.load({
  google: {
    families: ['Ubuntu:300,400,700'],
  },
});

document.documentElement.appendChild(document.createElement('div')).id = 'insight-widget';

render(
  // <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={'/admin'} />
        <Route component={ChatWidget} />
      </Switch>
    </BrowserRouter>
  // </Provider>
  ,
  document.getElementById('insight-widget'),
);
