import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import styles from './styles.scss';

class TableItself extends React.Component {
  constructor() {
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
      username: 'User name',
      firstname: 'First name',
      lastname: 'Last name',
    };
  }

  hoverRow(e) {
    console.log(e);
  }

  generateRows() {
    return this.props.statistics.map((row, index) => (
      <TableRow key={`row ${index}`} value={row} style={{ borderBottom: '1px solid #E0F7FA' }}> {
        this.props.options.map((elem) => {
          if (elem === 'username') {
            return (<TableRowColumn
              key={`row ${index},column${elem}`}
              style={{ fontSize: '12px', width: '200px', padding: '5px' }}
            >
              <span>{row.userId.username}</span>
            </TableRowColumn>);
          }
          if (elem === 'firstname') {
            return (<TableRowColumn
              key={`row ${index},column${elem}`}
              style={{ fontSize: '12px', width: '200px', padding: '5px' }}
            >
              <span>{row.userId.firstName}</span>
            </TableRowColumn>);
          }
          if (elem === 'lastname') {
            return (<TableRowColumn
              key={`row ${index},column${elem}`}
              style={{ fontSize: '12px', width: '200px', padding: '5px' }}
            >
              <span>{row.userId.lastName}</span>
            </TableRowColumn>);
          }
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

  render() {
    return (
      <div className={styles.table} >
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

TableItself.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.string),
  statistics: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default TableItself;
