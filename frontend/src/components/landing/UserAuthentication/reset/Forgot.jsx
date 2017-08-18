import React from 'react';
import { Switch, Route } from 'react-router';
import RestoreForm from './RestoreForm';
import EmailSent from './EmailSent';

class Forgot extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/forgot/success" component={EmailSent} />
        <Route path="/forgot/:userType" component={RestoreForm} />
      </Switch>
    );
  }
}

export default Forgot;
