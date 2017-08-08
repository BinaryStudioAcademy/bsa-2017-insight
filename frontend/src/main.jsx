import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Hello from './components/hello/hello';
import LogIn from './components/admin/logIn.jsx';
import './common/styles/main.scss';

render(
  <MuiThemeProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Hello} />
        <Route exact path="/hello" component={Hello} />
        <Route exact path="/login" component={LogIn} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
  , document.getElementById('root'));
