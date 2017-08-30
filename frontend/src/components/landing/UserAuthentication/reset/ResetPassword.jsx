import React from 'react';
import { Switch, Route } from 'react-router';
import ResetForm from './ResetForm';
import InvalidToken from './InvalidToken';

class ResetPassword extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/reset/invalidtoken" component={InvalidToken} />
        <Route path="/reset/:userType/:token" component={ResetForm} />
      </Switch>
    );
  }
}

export default ResetPassword;
