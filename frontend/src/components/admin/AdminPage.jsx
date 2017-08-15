import React from 'react';
import { Switch, Route } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header/Header';
import LeftSideMenu from './LeftSideMenu/LeftSideMenu';
import UserInfoTable from './Table/Table';
import Filter from './Filter/Filter';
import IncorrectRoute from '../incorrectRoute/IncorrectRoute';

injectTapEventPlugin();

// на этом месте будут поля данных из БД
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
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={{ minWidth: '700px' }}>
          <LeftSideMenu
            width={this.leftMenuWidth}
          />
          {console.log(this.props.match)}
          <div style={{ margin: '-8px -8px 0px 0px', paddingLeft: '67px' }}>
            <Header />
            <Switch>
              <Route
                path={'/admin/'}
                render={() => {
                  return (
                    <div>
                      <Filter statisticOptions={statisticOptions} />
                      <UserInfoTable statisticOptions={statisticOptions} />
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
              {/* <Route path={'/admin/engage'} render={() => 'Engage component: message sender'} /> */}
              {/* <Route component={IncorrectRoute} /> */}
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AdminPage;
