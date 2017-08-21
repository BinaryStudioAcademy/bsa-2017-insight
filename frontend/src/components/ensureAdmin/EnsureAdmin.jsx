import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class EnsureAdmin extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    // console.log('ENSURE ADMIN WILL RECEIVE PROPS:');
    // console.log(this.props);
    // console.log('ENSURE ADMIN STATE WILL BE:');
    // console.log(this.state);
    this.setState({ currentUser: nextProps.currentUser });
  }

  render() {
    // If current user isn't in the state yet or currentUser is empty
    if (!this.state.currentUser || !Object.keys(this.state.currentUser).length) {
      return (
        <div>
          <p>Authentication in progress.</p>
          <p>If you see this message for more than a few seconds
             please make sure that you are logged in as admin and try to reload this page.</p>
        </div>
      );
    }
    // If current user is in the state, but isn't considered admin
    else if (Object.keys(this.state.currentUser).length && !this.state.currentUser.isAdmin) {
      return (
        <Switch>
          <Redirect to={'/admin/login'} />
        </Switch>
      );
    }
    // If current user is admin
    else {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
  }
}

export default EnsureAdmin;
