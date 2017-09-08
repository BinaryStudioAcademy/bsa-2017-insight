import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Header from './Header/Header';
import LeftSideMenu from './LeftSideMenu/LeftSideMenu';
import UserInfoTable from './Table/Table';
import * as statisticActions from '../../actions/statisticActions';
import Login from './AdminAuthentication/AdminLogin';
import Registration from './AdminAuthentication/AdminRegistration';
import AppRegistration from './AdminAuthentication/AppRegistration';
import IncorrectRoute from '../incorrectRoute/IncorrectRoute';
import Respond from './Respond/index';
import EnsureAdmin from '../ensureAdmin/EnsureAdmin';
import StatisticsFilter from './StatisticsFilter/StatisticsFilter';
import StatisticsCharts from './StatisticsCharts/StatisticsCharts';
import getCurrentUser from '../../actions/getCurrentUserAction';
import styles from './styles.scss';
import Engage from './Engage/Engage';
import GeneralSettings from './Settings/GeneralSettings';
import WidgetSettings from './Settings/WidgetSettings/WidgetSettings';
import FAQ from './FAQ/FAQ';
import AppList from './AppList/Apps';
import Homepage from './Homepage/Homepage'

injectTapEventPlugin();

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.leftMenuWidth = 75;
    this.headerHeight = 65;
    this.state = {
      chosenTheme: lightBaseTheme,
    };
    this.toggleTheme = this.toggleTheme.bind(this);
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
    return options;
  }

  toggleTheme() {
    // console.log('Current theme:');
    // console.log(this.state.chosenTheme);
    this.setState({
      chosenTheme: this.state.chosenTheme === lightBaseTheme ? darkBaseTheme : lightBaseTheme,
    }, () => {
      document.documentElement.style = `background-color: ${this.state.chosenTheme.palette.canvasColor}`;
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(this.state.chosenTheme)}>
        <div
          className={styles['admin-page']}
          style={{
            fontFamily: 'Roboto, sans-serif',
            backgroundColor: this.state.chosenTheme.palette.canvasColor,
            color: this.state.chosenTheme.palette.textColor,
            minHeight: 'calc(100vh - 8px)',
          }}
        >
          <Switch>
            <Route path={'/admin/login'} component={Login} />
            <Route path={'/admin/registration'} component={Registration} />
            <Route path={'/app/registration'} component={AppRegistration} />
            <Route render={() => {
              return (
                <EnsureAdmin currentUser={this.state.currentUser}>
                  <LeftSideMenu
                    width={this.leftMenuWidth}
                    chosenTheme={this.state.chosenTheme}
                    currentUser={this.props.currentUser}
                  />
                  <div style={{ margin: '-8px -8px 0px 0px', paddingLeft: this.leftMenuWidth - 8 }}>
                    <Header
                      currentUser={this.state.currentUser}
                      toggleTheme={this.toggleTheme}
                      chosenTheme={this.state.chosenTheme}
                      style={{ height: this.headerHeight }}
                    />
                    {/*style={{ height: `calc(100vh - ${this.headerHeight + 8}px)`, overflowY: 'scroll' }}*/}
                    <div >
                      <Switch>
                        <Route
                          exact
                          path={'/admin'}
                          render={() => {
                            const statistics = this.props.usersToRender;
                            const options = this.getStatisticOptions(this.props.usersToRender);
                            return (
                              <div className={styles['statistics-content-wrapper']}>
                                <Homepage 
                                  chosenTheme={this.state.chosenTheme}
                                  fieldsToDisplay={this.props.fieldsToDisplay}
                                  statistics={statistics}
                                  statisticOptions={options}
                                  updateFields={this.props.updateFields}  
                                />
                              </div>
                            );
                          }}
                        />
                        <Route
                          path="/admin/respond"
                          render={() => (
                            <Respond
                              headerHeight={this.headerHeight}
                              chosenTheme={this.state.chosenTheme}
                            />)
                          }
                        />
                        <Route
                          path={'/admin/engage'}
                          render={() => (
                            <Engage
                              headerHeight={this.headerHeight}
                              chosenTheme={this.state.chosenTheme}
                            />
                          )}
                        />
                        <Route path={'/admin/settings/general'} component={GeneralSettings} />
                        <Route path={'/admin/faq'} component={FAQ} />
                        <Route path={'/admin/settings/widget'} component={WidgetSettings} />
                        <Route
                          path={'/admin/apps'}
                          render={() => (
                            <AppList
                              headerHeight={this.headerHeight}
                              chosenTheme={this.state.chosenTheme}
                            />
                          )}
                        />
                        <Route component={IncorrectRoute} />
                      </Switch>
                    </div>
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
  getAllStatistic: PropTypes.func,
  usersToRender: PropTypes.arrayOf(PropTypes.object),
  getCurrentUser: PropTypes.func,
  fieldsToDisplay: PropTypes.arrayOf(PropTypes.string),
  updateFields: PropTypes.func,
  currentUser: PropTypes.shape(),
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
      return dispatch({ type: 'UPDATE_FIELDS', payload: newFields });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
