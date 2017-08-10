import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Hello from './components/hello/hello';
import AdminLogin from './components/admin/login';
import AdminRegister from './components/admin/register';
import { store, sagaMiddleware } from './store';
import rootSaga from './saga/rootSaga';

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} component={Hello} />
        <Route exact path={'/hello'} component={Hello} />
        <Route exact path={'/adminlogin'} component={AdminLogin} />
        <Route exact path={'/adminregister'} component={AdminRegister} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'),
);

sagaMiddleware.run(rootSaga);
