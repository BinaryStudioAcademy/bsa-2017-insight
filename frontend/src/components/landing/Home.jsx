import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './styles.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import HomeContent from './HomeContent/HomeContent';
import Product from './Product/Product';
import Pricing from './Pricing/Pricing';
import Login from './Login/Login';
import IncorrectRoute from './../incorrectRoute/IncorrectRoute';
import ChatWidget from '../chatWidget/ChatWidget';

import Login1 from './UserAuthentication/UserLogin';
import Registration from './UserAuthentication/UserRegistration';

import Forgot from '../forgot/Forgot';
import ResetPassword from '../reset/ResetPassword';
import InvalidToken from '../invalidtoken/InvalidToken';

import '../../components/analytics/analytics';
import '../../components/analytics/getStatistics';

class Home extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Header />
        <Switch>
          <Route exact path={'/'} component={HomeContent} />
          <Route path={'/engage'} component={Product} />
          <Route path={'/respond'} component={Product} />
          <Route path={'/customers'} component={HomeContent} />
          <Route path={'/help'} component={HomeContent} />
          <Route path={'/about'} component={HomeContent} />
          <Route path={'/pricing'} component={Pricing} />
          <Route path={'/login'} component={Login} />
          <Route path={'/login1'} component={Login1} />
          <Route path={'/registration'} component={Registration} />
          <Route path={'/forgot'} component={Forgot} />
          <Route path={'/reset'} component={ResetPassword} />
          <Route path={'/invalidtoken'} component={InvalidToken} />
          <Route component={IncorrectRoute} />
        </Switch>
        <Footer />
        <Route component={ChatWidget} />
      </div>
    );
  }
}

export default Home;
