import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import AdminLogin from './components/admin/login';
import AdminRegister from './components/admin/register';
import { store, sagaMiddleware } from './store';
import rootSaga from './saga/rootSaga';
import Home from './components/landing/Home';

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={'/'} component={Home} />
        <Route exact path={'/adminlogin'} component={AdminLogin} />
        <Route exact path={'/adminregister'} component={AdminRegister} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

sagaMiddleware.run(rootSaga);
