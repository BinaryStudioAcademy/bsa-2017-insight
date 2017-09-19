import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './styles.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import HomeContent from './HomeContent/HomeContent';
import EngageProduct from './Product/EngageProduct';
import RespondProduct from './Product/RespondProduct';
import Pricing from './Pricing/Pricing';
import Customers from './Resources/Customers';
import HelpCenter from './Resources/HelpCenter';
import About from './About/About';
import IncorrectRoute from './../incorrectRoute/IncorrectRoute';
import Login from './UserAuthentication/UserLogin';
import Registration from './UserAuthentication/UserRegistration';
import Forgot from './UserAuthentication/reset/Forgot';
import ResetPassword from './UserAuthentication/reset/ResetPassword';
import InvalidToken from './UserAuthentication/reset/InvalidToken';

class Home extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Header />
        <Switch>
          <Route exact path={'/'} component={HomeContent} />
          <Route path={'/engage'} component={EngageProduct} />
          <Route path={'/respond'} component={RespondProduct} />
          <Route path={'/customers'} component={Customers} />
          <Route path={'/help'} component={HelpCenter} />
          <Route path={'/about'} component={About} />
          <Route path={'/pricing'} component={Pricing} />
          <Route path={'/login'} component={Login} />
          <Route path={'/registration'} component={Registration} />
          <Route path={'/forgot'} component={Forgot} />
          <Route path={'/reset'} component={ResetPassword} />
          <Route path={'/invalidtoken'} component={InvalidToken} />
          <Route component={IncorrectRoute} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Home;
