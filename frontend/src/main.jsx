import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader';
import { store, sagaMiddleware } from './store';
import rootSaga from './saga/rootSaga';
import Home from './components/landing/Home';
import AdminPage from './components/admin/AdminPage';
// import './components/analytics/analytics';

WebFont.load({
  google: {
    families: ['Ubuntu:300,400,700', 'Roboto'],
  },
});

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={'/admin'} component={AdminPage} />
        <Route component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
