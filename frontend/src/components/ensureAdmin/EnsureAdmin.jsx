import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCurrentUser from '../../actions/getCurrentUserAction';
import AdminPage from '../admin/AdminPage';

class EnsureAdmin extends React.Component {
  // componentWillMount() {
  //   console.log('hooray, component will mount');
  //   console.log(this.props);
  //   console.log(window._injectedData);
  //   this.props.getCurrentUser();
  // }
  // componentDidMount() {
  //   console.log('MOUNTED, CURRENT PROPS ARE:');
  //   console.log(this.props);
  // }
  componentWillReceiveProps() {
    console.log('INTERNAL WILL RECEIVE PROPS:');
    console.log(this.props);
  }
  render() {
    if (!this.props.currentUser || this.props.currentUser && !this.props.currentUser.isAdmin) {
      return (
        <Switch>
          <Route path={'/admin/login'} component={AdminPage} />
          <Redirect to={'/admin/login'} />
        </Switch>
      );
    }
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.currentUser
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getCurrentUser: () => {
//       dispatch(getCurrentUser());
//     }
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(EnsureAdmin);

export default EnsureAdmin;
