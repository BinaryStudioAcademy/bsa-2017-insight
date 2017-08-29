// import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import ChatWidget from './chatWidget/ChatWidget';
import '../analytics/analytics';

if (!window._babelPolyfill) {
  require('babel-polyfill');
}

// TEMPORARY PLACEHOLDER
// if (!window._injectedData || Object.keys(window._injectedData) < 2) {
//   window._injectedData = JSON.parse(`{"_id":"59a54dea8d318d86615746b3","userId":{"_id":"59a54dea8d318d86615746b2","firstName":"Kenny","lastName":"McCormick","dateOfBirth":"0001-01-01T00:00:00.000Z","password":"$2a$10$26CYrwL6HM93Jiuwn3tI3.x3mH7EfgpmMD079TO4El3dKSsff.FGu","company":"undefined","email":"artem.m.manukyan@gmail.com","avatar":"PrincessKenny-1504005610006.png","__v":0,"conversations":[],"username":"PrincessKenny"},"__v":0,"viewedUrls":[]}`);
// }

WebFont.load({
  google: {
    families: ['Ubuntu:300,400,700'],
  },
});

document.documentElement.appendChild(document.createElement('div')).id = 'insight-widget';

render(
  <BrowserRouter>
    <Switch>
      <Route path={'/admin'} />
      <Route component={ChatWidget} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('insight-widget'),
);
