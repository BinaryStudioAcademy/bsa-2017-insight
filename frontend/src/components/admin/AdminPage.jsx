import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from './Header/Header';
import LeftSideMenu from './LeftSideMenu/LeftSideMenu';
import UserInfoTable from './Table/Table';
import Filter from './Filter/Filter';
import * as statisticActions from '../../actions/statisticActions';
import Login from './AdminAuthentication/AdminLogin';
import Registration from './AdminAuthentication/AdminRegistration';
import IncorrectRoute from '../incorrectRoute/IncorrectRoute';
import Respond from './Respond/index';
import EnsureAdmin from '../ensureAdmin/EnsureAdmin';
import getCurrentUser from '../../actions/getCurrentUserAction';
import StatisticsFilter from './StatisticsFilter/StatisticsFilter';
import StatisticsCharts from './StatisticsCharts/StatisticsCharts';

const muiTheme = getMuiTheme({
  tooltip: {
    rippleBackgroundColor: '#333333',
  },
});

injectTapEventPlugin();

// const statisticOptions = {
//   items: ['Name', 'Email', 'Last seen'],
//   Name: [
//     {
//       'Name 1': 'name-option1',
//     },
//     {
//       'Name 2': 'name-option2',
//     }],
//   Email: [
//     {
//       'email 1': 'email-option1',
//     },
//     {
//       'email 2': 'email-option2',
//     },
//   ],
//   'Last seen': [
//     {
//       'more than': 'days ago',
//     },
//     {
//       exactly: 'days ago',
//     },
//     {
//       'less than': 'days ago',
//     },
//   ],
// };

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.leftMenuWidth = 75;
    this.state = {};
  }

  componentWillMount() {
    this.props.getCurrentUser();
  }

  componentDidMount() {
    this.props.getAllStatistic();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentUser: nextProps.currentUser });
  }

  getStatisticOptions(arr) {
    let options = [];
    if (typeof (arr[0]) === 'object') {
      options = Object.keys(arr[0]);
    }
    // console.log(this);
    return options;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{ minWidth: '700px', fontFamily: 'Roboto, sans-serif' }}>
          <Switch>
            <Route path={'/admin/login'} component={Login} />
            <Route path={'/admin/registration'} component={Registration} />
            <Route render={() => {
              return (
                <EnsureAdmin currentUser={this.state.currentUser}>
                  <LeftSideMenu
                    width={this.leftMenuWidth}
                  />
                  <div style={{ margin: '-8px -8px 0px 0px', paddingLeft: '67px' }}>
                    <Header currentUser={this.state.currentUser} />
                    <Switch>
                      <Route
                        exact
                        path={'/admin'}
                        render={() => {
                          const statistics = this.props.usersToRender;
                          const options = this.getStatisticOptions(this.props.usersToRender);
                          return (
                            <div>
                              <div style={{ position: 'relative', height: '64px', zIndex: 1000 }}>
                                <Filter selectedFields={this.props.fieldsToDisplay} statisticOptions={options} updateFields={this.props.updateFields}/>
                              </div>
                              <StatisticsFilter />
                              <UserInfoTable
                                options={this.props.fieldsToDisplay}
                                statistics={statistics}
                              />
                              <StatisticsCharts
                                selectedFields={this.props.fieldsToDisplay}
                                statistics={statistics}
                              />
                            </div>
                          );
                        }}
                      />
                      <Route path="/admin/respond" component={Respond} />
                      <Route
                        path={'/admin/engage'}
                        render={() => {
                          return (
                            <div>Engage component is coming soon!</div>
                          );
                        }}
                      />
                      <Route component={IncorrectRoute} />
                    </Switch>
                  </div>
                </EnsureAdmin>
              );
            }}
            />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

AdminPage.propTypes = {
  getAllStatistic: React.PropTypes.func,
  allData: React.PropTypes.arrayOf(React.PropTypes.object),
  usersToRender: React.PropTypes.arrayOf(React.PropTypes.object),
};

const mapStateToProps = (state) => {
  return {
    fieldsToDisplay: state.statistics.fieldsToDisplay,
    currentUser: state.currentUser.currentUser,
    usersToRender: state.statistics.usersToRender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllStatistic: () => {
      return dispatch(statisticActions.getAllStatistics());
    },
    getCurrentUser: () => {
      return dispatch(getCurrentUser());
    },
    updateFields: (newFields) => {
      return dispatch({ type: 'UPDATE_FIELDS', payload: newFields })
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
