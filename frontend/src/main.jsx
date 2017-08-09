import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/landing/Home';

render(
    <BrowserRouter>
        <Switch>
            <Route path='/' component={Home}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
)
