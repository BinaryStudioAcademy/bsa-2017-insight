import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader';
import { store, sagaMiddleware } from './store';
import rootSaga from './saga/rootSaga';

import Home from './components/landing/Home';
// import AdminPage from './components/admin/AdminPage';

// import UserLogin from './components/user/login';
// import UserRegistration from './components/user/registration';
// import AdminLogin from './components/admin/login';
// import AdminRegistration from './components/admin/registration';


import HomeContent from './components/landing/HomeContent/HomeContent';
// import Login from './components/landing/Login/Login';
// import Pricing from './components/landing/Pricing/Pricing';
// import Product from './components/landing/Product/Product';
// import IncorrectRoute from './components/incorrectRoute/IncorrectRoute';

import './components/analytics/analytics';
import './components/analytics/getStatistics';

WebFont.load({
  google: {
    families: ['Ubuntu:300,400,700', 'Roboto'],
  },
});

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={'/'} component={Home}>
        <IndexRoute component={HomeContent} />
        {/* <Route path={'/engage'} component={Product} /> */}
        {/* <Route path={'/respond'} component={Product} /> */}
        {/* <Route path={'/customers'} component={HomeContent} /> */}
        {/* <Route path={'/help'} component={HomeContent} /> */}
        {/* <Route path={'/about'} component={HomeContent} /> */}
        {/* <Route path={'/pricing'} component={Pricing} /> */}
        {/* <Route path={'/login'} component={Login} /> */}
        {/* <Route path={'*'} component={IncorrectRoute} /> */}
        <Route path={'admin'} component={Home}>
          <Route path={'lalala'} component={HomeContent} />
          {/* <Route path={'/admin'} component={AdminPage} /> */}
          {/* <Route path={'/userlogin'} component={UserLogin} /> */}
          {/* <Route path={'/userregistration'} component={UserRegistration} /> */}
          {/* <Route path={'/adminlogin'} component={AdminLogin} /> */}
          {/* <Route path={'/adminregistration'} component={AdminRegistration} /> */}
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

sagaMiddleware.run(rootSaga);
