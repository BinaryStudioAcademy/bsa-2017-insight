import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import ChatWidget from './chatWidget/ChatWidget';
import '../analytics/analytics';

if (!window._babelPolyfill) {
  require('babel-polyfill');
}

if (!window._injectedData) {
  window._injectedData = { text: 'injectedData' };
}

if (!window._injectedData) window._injectedData = { text: 'injectedData' };
window._injectedData.insightHost = process.env.NODE_ENV === 'development' ?
  'http://localhost:3001' : 'http://78.129.225.86:3001';

WebFont.load({
  google: {
    families: ['Ubuntu:300,400,700'],
  },
});

document.documentElement.appendChild(document.createElement('div')).id = 'insight-widget';

render(
  <BrowserRouter>
    { !window._injectedData.isAdmin ?
      <Switch>
        <Route path={'/admin'} />
        <Route path={'/app'} />
        <Route component={ChatWidget} />
      </Switch> : <div />
    }
  </BrowserRouter>,
  document.getElementById('insight-widget'),
);
