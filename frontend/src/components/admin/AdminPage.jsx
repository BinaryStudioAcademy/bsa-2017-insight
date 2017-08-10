import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MyThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header/Header';
import LeftSideMenu from './LeftSideMenu/LeftSideMenu';
import Table from './Table/Table';

injectTapEventPlugin();

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
          <div style={{ paddingLeft: this.leftMenuWidth }}>
            <Header />
            <Table />
          </div>
        </div>
      </MyThemeProvider>
    );
  }
}

export default AdminPage;
