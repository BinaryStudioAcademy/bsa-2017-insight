import React from 'react';
import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './styles.scss';
import Filter from '../Filter/Filter';

class UserInfoTable extends React.Component {
  constructor(props) {
    super();
    this.state = {
      browser: 'Browser',
      browserLanguage: 'Browser Language',
      browserVersion: 'Browser Version',
      city: 'City',
      coordinates: 'Coordinates',
      country: 'Country',
      currentUrl: 'Current URL',
      deviceType: 'Device Type',
      geoLocation: 'Geolocation',
      _id: 'ID',
      online: 'Online',
      os: 'OS',
      screenHeight: 'Screen Height',
      screenWidth: 'Screen Width',
      timeZone: 'Timezone',
      userAgent: 'User Agent',
      userId: 'User ID',
      userIpAddress: 'IP Address',
      viewedUrls: 'Viewed URLs',
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  hoverRow(e) {
    console.log(e);
  }

  generateRows() {
    return this.props.statistics.map((row, index) => (
      <TableRow key={`row ${index}`} value={row} style={{ borderBottom: '1px solid #E0F7FA' }}> {
        this.props.options.map((elem) => {
          return (<TableRowColumn
            key={`row ${index},column${elem}`}
            style={{ fontSize: '12px', width: '200px', padding: '5px' }}
          >
            <span>{row[elem]}</span>
          </TableRowColumn>);
        })
      }
      </TableRow>
    ));
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <RaisedButton
        label="Save"
        primary={true}
        onClick={this.handleClose}
      />,
    ];
    return (
      <div className={styles.container} >
        <RaisedButton label="Columns Filter" onClick={this.handleOpen} primary={true} style={{ marginBottom: '5px' }} />
        <Dialog
          title="Columns Filter"
          actions={actions}
          modal={true}
          open={this.state.open}
          bodyStyle={{ overflowX: 'hidden' }}
        >
          <Filter
            selectedFields={this.props.selectedFields}
            statisticOptions={this.props.statisticOptions}
            updateFields={this.props.updateFields}
          />
        </Dialog>
        <Table bodyStyle={{ overflow: 'visible' }}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow style={{ height: '25px' }}>
              {this.props.options.map((elem) => {
                return (<TableHeaderColumn
                  key={elem}
                  style={{
                    fontSize: '12px',
                    width: '200px',
                    padding: '5px',
                    height: '25px',
                  }}
                >
                  {this.state[elem]}
                </TableHeaderColumn>);
              })}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              this.generateRows()
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

UserInfoTable.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.string),
  statistics: React.PropTypes.arrayOf(React.PropTypes.object),
  statisticOptions: React.PropTypes.arrayOf(React.PropTypes.string),
  selectedFields: React.PropTypes.arrayOf(React.PropTypes.string),
  updateFields: React.PropTypes.func,
};

export default UserInfoTable;
