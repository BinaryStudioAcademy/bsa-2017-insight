import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import User from './components/user/User';
import Admin from './components/admin/Admin';
import { store, sagaMiddleware } from './store';
import rootSaga from './saga/rootSaga';
import Home from './components/landing/Home';
import Forgot from './components/forgot/Forgot';
import ResetPassword from './components/reset/ResetPassword';

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={'/forgot'} component={Forgot} />
        <Route path={'/reset'} component={ResetPassword} />
        <Route path={'/user'} component={User} />
        <Route path={'/admin'} component={Admin} />
        <Route path={'/'} component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

sagaMiddleware.run(rootSaga);
