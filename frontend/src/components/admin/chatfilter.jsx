import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import * as usersActions from '../../actions/usersActions';

class Register extends React.Component {
  render() {
    return (
      <div>
        <div className={styles['project-name']}>Insight</div>
        <form action="/api/admin/chatfilter" method="post">
          <div>
            <label htmlFor="operator">Choose operator:</label>
            <select name="operator" id="operator">
              <option />
              <option value="444">Иван Иванов</option>
              <option value="555">Петр Петров</option>
              <option value="666">Семен Семенов</option>
            </select>
          </div>

          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
          </div>

          <div>
            <label htmlFor="status">Chat status</label>
            <select name="status" id="status">
              <option />
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label htmlFor="errorCode">Error code</label>
            <input type="text" name="errorCode" id="errorCode" />
          </div>

          <div>
            <label htmlFor="date">Choose date:</label>
            <input type="date" name="date" id="date" />
          </div>

          <div>
            <input type="submit" value="Search" />
          </div>
        </form>
      </div>
    );
  }
}
// <button onClick={() => { this.props.getAllUsers(); }}>GET USERS</button>

Register.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
