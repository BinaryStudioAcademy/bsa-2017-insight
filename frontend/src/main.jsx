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

import UserLogin from './components/user/login';
import UserRegistration from './components/user/registration';
import AdminLogin from './components/admin/login';
import AdminRegistration from './components/admin/registration';

import './components/analytics/analytics';
import './components/analytics/getStatistics';

WebFont.load({
  google: {
    families: ['Ubuntu:300,400,700', 'Roboto'],
  },
});

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={'/admin'} component={AdminPage} />
        <Route exact path={'/userlogin'} component={UserLogin} />
        <Route exact path={'/userregistration'} component={UserRegistration} />
        <Route exact path={'/adminlogin'} component={AdminLogin} />
        <Route exact path={'/adminregistration'} component={AdminRegistration} />
        <Route component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

sagaMiddleware.run(rootSaga);
