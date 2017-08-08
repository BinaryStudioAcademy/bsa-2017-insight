import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Hello from './components/hello/hello';
import { store, sagaMiddleware } from './store';
import rootSaga from './saga/rootSaga';
import AdminChat from './components/adminChat/adminChat.jsx';

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} component={Hello} />
        <Route exact path={'/hello'} component={Hello} />
        <Route exact path={'/chat'} component={AdminChat} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'),
);

sagaMiddleware.run(rootSaga);
