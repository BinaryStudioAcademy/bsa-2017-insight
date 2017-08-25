import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './styles.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import HomeContent from './HomeContent/HomeContent';
import Product from './Product/Product';
import Pricing from './Pricing/Pricing';
import IncorrectRoute from './../incorrectRoute/IncorrectRoute';
import ChatWidget from '../chatWidget/ChatWidget';
import Login from './UserAuthentication/UserLogin';
import Registration from './UserAuthentication/UserRegistration';
import Forgot from './UserAuthentication/reset/Forgot';
import ResetPassword from './UserAuthentication/reset/ResetPassword';
import InvalidToken from './UserAuthentication/reset/InvalidToken';

import '../../components/analytics/analytics'; // на обсуждение

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
