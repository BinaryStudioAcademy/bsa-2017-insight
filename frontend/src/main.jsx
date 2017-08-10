import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, sagaMiddleware } from './store';
import WebFont from 'webfontloader';
import rootSaga from './saga/rootSaga';
import Home from './components/landing/Home';
import AdminPage from './components/admin/AdminPage';

WebFont.load({
  google: {
    families: ['Ubuntu:300,400,700'],
  },
});

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={/\/(?!admin)/} component={Home} />
        <Route path={'/admin'} component={AdminPage} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

sagaMiddleware.run(rootSaga);
