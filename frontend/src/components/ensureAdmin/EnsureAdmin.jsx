import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// import AdminPage from '../admin/AdminPage';

class EnsureAdmin extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    console.log('INTERNAL WILL RECEIVE PROPS:');
    console.log(this.props);
    console.log(this.state);
    // if (this.props.currentUser) {
    //   console.log('Current user in internal');
    //   console.log(this.props.currentUser);
    // }
    this.setState({ currentUser: nextProps.currentUser });
  }
  render() {
    // If current user isn't in the state yet
    if (!this.state.currentUser) {
      return (
        <div>
          <p>Authentication in progress.</p>
          <p>If you see this message for more than a few seconds \
            please make sure that you are logged in as admin and try to reload this page.</p>
        </div>
      );
    }
    // If current user is in the state, but isn't considered admin
    else if (this.state.currentUser && !this.state.currentUser.isAdmin) {
      return (
        <Switch>
          {/* <Route path={'/admin/login'} component={AdminPage} /> */}
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
