// import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import { Provider } from 'react-redux';
import { store, sagaMiddleware } from '../../store';
// import rootSaga from '../../saga/rootSaga';
import ChatWidget from './chatWidget/ChatWidget';
import '../analytics/analytics';

// TEMPORARY PLACEHOLDER
window._injectedData = {
  _id: 'd600588ef8109d2084f88eed',
  salt: '$2a$10$Q9yjTFQ0y3RVxDD7uqIlS.',
  password: '$2a$10$Q9yjTFQ0y3RVxDD7uqIlS..LGOD2YhU7v5UGJUL1PGVxVGObCRp3m',
  conversations: [],
  username: 'Anonymous',
  __v: 0,
};

// sagaMiddleware.run(rootSaga);

WebFont.load({
  google: {
    families: ['Ubuntu:300,400,700'],
  },
});

document.documentElement.appendChild(document.createElement('div')).id = 'insight-widget';

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={'/admin'} />
        <Route component={ChatWidget} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('insight-widget'),
);
