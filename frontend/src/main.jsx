import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, sagaMiddleware } from './store';
import rootSaga from './saga/rootSaga';
import Home from './components/landing/Home';
import Forgot from './components/forgot/Forgot';
import ResetPassword from './components/reset/ResetPassword';
import InvalidToken from './components/invalidtoken/InvalidToken';

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={'/forgot'} component={Forgot} />
        <Route path={'/reset/:token'} component={ResetPassword} />
        <Route path={'/invalidtoken'} component={InvalidToken} />
        <Route path={'/'} component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

sagaMiddleware.run(rootSaga);
