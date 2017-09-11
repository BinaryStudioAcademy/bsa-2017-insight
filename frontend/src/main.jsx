import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader';
import { store, sagaMiddleware } from './store';
import Home from './components/landing/Home';
import AdminPage from './components/admin/AdminPage';
import rootSaga from './saga/rootSaga';

sagaMiddleware.run(rootSaga);

WebFont.load({
  google: {
    families: ['Ubuntu:300,400,700', 'Roboto:300,400,500,600,700,800'],
  },
});


if (!window._injectedData) window._injectedData = { text: 'injectedData' };
window._injectedData.insightHost = 'http://localhost:3000';

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={'/admin'} component={AdminPage} />
        <Route path={'/app'} component={AdminPage} />
        <Route component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
