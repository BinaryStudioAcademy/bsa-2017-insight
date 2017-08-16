import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import UserLogin from './components/user/login';
import UserRegistration from './components/user/registration';
import AdminLogin from './components/admin/login';
import AdminRegistration from './components/admin/registration';
import { store, sagaMiddleware } from './store';
import rootSaga from './saga/rootSaga';
import Home from './components/landing/Home';
import Respond from './components/admin/Respond';

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path={'/userlogin'} component={UserLogin} />
        <Route exact path={'/userregistration'} component={UserRegistration} />
        <Route exact path={'/adminlogin'} component={AdminLogin} />
        <Route exact path={'/adminregistration'} component={AdminRegistration} />
        <Route exact path={'/respond'} component={Respond} />
        <Route path={'/'} component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);


