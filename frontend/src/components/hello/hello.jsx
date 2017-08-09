import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import * as usersActions from '../../actions/usersActions';

class Hello extends React.Component {
  render() {
    return (
      <div>
        <div className={styles['project-name']}>Insight</div>
        <button onClick={() => this.props.getAllUsers()}>GET USERS</button>
      </div>
    );
  }
}

Hello.propTypes = {
  getAllUsers: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => {
      dispatch(usersActions.getAllUsers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
