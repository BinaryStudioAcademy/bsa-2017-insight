import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as usersActions from '../../actions/usersActions';

class EnsureAdmin extends React.Component {
  componentWillMount() {
    console.log('hooray, component will mount');
    console.log(this.props);
    if (window._injectedData && window._injectedData.isAdmin) {
      console.log('ADMINNNNN!!!!');
    } else {
      console.log('NOT ADMIN =(');
    }
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getAllUsers: () => {
//       dispatch(usersActions.getAllUsers());
//     },
//   };
// };

export default connect(mapStateToProps)(EnsureAdmin);
