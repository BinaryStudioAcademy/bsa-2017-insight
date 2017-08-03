import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Hello from './components/hello/hello';
import { BrowserRouter, Route, IndexRoute } from 'react-router-dom'

render(
    <BrowserRouter>
        <Route component={Hello} path="/"></Route>
    </BrowserRouter>
    , document.getElementById('root')
)
