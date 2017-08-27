import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';

class EnsureAdmin extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentUser: nextProps.currentUser });
  }

  render() {
    if (!this.state.currentUser || !Object.keys(this.state.currentUser).length) {
    // If current user isn't in the state yet or currentUser is empty
      return (
        <div>
          <p>Authentication in progress.</p>
          <p>If you see this message for more than a few seconds
             please make sure that you are logged in as admin and try to reload this page.</p>
        </div>
      );
    } else if (this.state.currentUser.userId) {
      // If current user is a logged user but is not an admin
      return (
        <div>
          <h3>Restricted area</h3>
          <p>Only admins have access to this page, sorry</p>
        </div>
      );
    } else if (Object.keys(this.state.currentUser).length && !this.state.currentUser.isAdmin) {
    // If current user is in the state, but isn't considered admin
      return (
        <Switch>
          <Redirect to={'/admin/login'} />
        </Switch>
      );
    } else {
    // If current user is admin
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
  }
}

EnsureAdmin.propTypes = {
  children: PropTypes.node,
  currentUser: PropTypes.shape({
    username: PropTypes.string,
  }),
};

export default EnsureAdmin;
