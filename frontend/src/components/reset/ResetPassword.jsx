import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ResetForm from './ResetForm';

class ResetPassword extends React.Component {
  render() {
    return (
      <div>
        <span>RESET</span>
        <Switch>
          <Route path={`/:token`} component={ResetForm} />
        </Switch>
      </div>
    );
  }
}

export default ResetPassword;