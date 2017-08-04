import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Hello from './components/hello/hello';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Hello}/>
            <Route exact path='/hello' component={Hello}/>
        </Switch>
    </BrowserRouter>
    , document.getElementById('root')
)
