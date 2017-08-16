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
import UserLogin from './components/user/UserLogin';
import UserRegistration from './components/user/UserRegistration';

import Forgot from './components/forgot/Forgot';
import ResetPassword from './components/reset/ResetPassword';
import InvalidToken from './components/invalidtoken/InvalidToken';

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
        <Route component={Home} />

        <Route path={'/forgot'} component={Forgot} />
        <Route path={'/reset'} component={ResetPassword} />
        <Route path={'/invalidtoken'} component={InvalidToken} />
        <Route path={'/userlogin'} component={UserLogin} />
        <Route path={'/userregistration'} component={UserRegistration} />
        {/* <Route path={'/adminlogin'} component={AdminLogin} /> */}
        {/* <Route path={'/adminregistration'} component={AdminRegistration} /> */}
        <Route path={'/'} component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

sagaMiddleware.run(rootSaga);
