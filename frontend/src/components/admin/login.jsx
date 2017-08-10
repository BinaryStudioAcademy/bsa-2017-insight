import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import * as usersActions from '../../actions/usersActions';

class Login extends React.Component {
  render() {
    return (
      <div>
        <div className={styles['project-name']}>Insight</div>
        <form action="/login" method="post">
          <div>
            <label>Username:</label>
            <input type="text" name="username"/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password"/>
          </div>
          <div>
            <input type="submit" value="Log In"/>
          </div>
        </form>
      </div>
    );
  }
}
// <button onClick={() => { this.props.getAllUsers(); }}>GET USERS</button>

Login.propTypes = {
  getAllUsers: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => {
      dispatch(usersActions.getAllUsers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
