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

// window._injectedData.insightHost = 'http://localhost:3000';

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
        <Route component={ChatWidget} />
      </Switch> : <div />
    }
  </BrowserRouter>,
  document.getElementById('insight-widget'),
);
