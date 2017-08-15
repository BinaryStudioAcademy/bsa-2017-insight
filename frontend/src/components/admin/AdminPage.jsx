import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MyThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header/Header';
import LeftSideMenu from './LeftSideMenu/LeftSideMenu';
import UserInfoTable from './Table/Table';
import Filter from './Filter/Filter';

injectTapEventPlugin();

//на этом месте будут поля данных из БД
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
      <MyThemeProvider>
        <div style={{ minWidth: '700px' }}>
          <LeftSideMenu
            width={this.leftMenuWidth}
          />
          <div style={{ margin: '-8px -8px 0px 0px', paddingLeft: '67px' }}>
            <Header />
            <Filter statisticOptions={statisticOptions} />
            <UserInfoTable statisticOptions={statisticOptions} />
          </div>
        </div>
      </MyThemeProvider>
    );
  }
}

export default AdminPage;
