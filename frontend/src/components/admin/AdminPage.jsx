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
import Login from './login';
import Registration from './registration';
import IncorrectRoute from '../incorrectRoute/IncorrectRoute';

const muiTheme = getMuiTheme({
  tooltip: {
    rippleBackgroundColor: '#333333',
  },
});

injectTapEventPlugin();

// На этом месте будут поля данных из БД
const statisticOptions = {
  items: ['Name', 'Email', 'Last seen'],
  Name: [
    {
      'Name 1': 'name-option1',
    },
    {
      'Name 2': 'name-option2',
    }],
  Email: [
    {
      'email 1': 'email-option1',
    },
    {
      'email 2': 'email-option2',
    },
  ],
  'Last seen': [
    {
      'more than': 'days ago',
    },
    {
      exactly: 'days ago',
    },
    {
      'less than': 'days ago',
    },
  ],
};


class AdminPage extends React.Component {
  constructor() {
    super();
    this.leftMenuWidth = 75;
    this.state = {
      data: {}
    };
  }

  componentWillMount() {
    console.log("COMPONENT WILL MOUNT!!");
    statisticActions.getStatistic();
    console.log(this.state.data);
  }




  render() {
    return (

      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{ minWidth: '700px' }}>
          <Switch>
            <Route path={'/admin/login'} component={Login} />
            <Route path={'/admin/registration'} component={Registration} />
            <Route render={() => {
              return (
                <div>
                  <LeftSideMenu
                    width={this.leftMenuWidth}
                  />
                  <div style={{ margin: '-8px -8px 0px 0px', paddingLeft: '67px' }}>
                    <Header />
                    <Switch>
                      <Route
                        exact path={'/admin'}
                        render={() => {
                          return (
                            <div>
                              <Filter statisticOptions={statisticOptions} />
                              <UserInfoTable statisticOptions={statisticOptions} />
                              <button onClick={() => statisticActions.getStatistic()}>Push me</button>
                            </div>
                          );
                        }}
                      />
                      <Route
                        path={'/admin/respond'}
                        render={() => {
                          return (
                            <div>respond</div>
                          );
                        }}
                      />
                      <Route
                        path={'/admin/engage'}
                        render={() => {
                          return (
                            <div>engage</div>
                          );
                        }}
                      />
                      <Route component={IncorrectRoute} />
                    </Switch>
                  </div>
                </div>
              );
            }} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatistic: () => {
      return dispatch(statisticActions.getStatistic());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
