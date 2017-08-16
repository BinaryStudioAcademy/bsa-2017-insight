import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import UserLogin from './components/user/UserLogin';
import UserRegistration from './components/user/UserRegistration';
import AdminLogin from './components/admin/AdminLogin';
import AdminRegistration from './components/admin/AdminRegistration';
import { store, sagaMiddleware } from './store';
import rootSaga from './saga/rootSaga';
import Home from './components/landing/Home';

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path={'/userlogin'} component={UserLogin} />
        <Route exact path={'/userregistration'} component={UserRegistration} />
        <Route exact path={'/adminlogin'} component={AdminLogin} />
        <Route exact path={'/adminregistration'} component={AdminRegistration} />
        <Route path={'/'} component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

sagaMiddleware.run(rootSaga);
