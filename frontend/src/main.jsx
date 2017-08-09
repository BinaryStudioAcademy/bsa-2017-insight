import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Hello from './components/hello/hello';
import Login from './components/login/login';
import Pricing from './components/pricing/pricing';
import Product from './components/product/product';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Hello} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/pricing" component={Pricing} />
      <Route exact path="/product" component={Product} />
    </Switch>
  </BrowserRouter>
  , document.getElementById('root'),
);
