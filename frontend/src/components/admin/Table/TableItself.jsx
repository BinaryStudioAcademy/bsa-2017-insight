import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
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
      currentPage: 1,
    };
  }

  hoverRow(e) {
    console.log(e);
  }

  generateRows() {
    const currPage = this.props.currentPage;
    const rowsPerPage = this.props.rowsPerPage;
    const numOfRows = this.props.statistics.length;
    const numOfPages = Math.ceil(numOfRows/rowsPerPage);
    if (numOfRows != 0){
      const startId = (currPage-1)*rowsPerPage;
      const endId = (currPage === numOfPages) ? numOfRows : (currPage*rowsPerPage);
      const rowsOnThisPage = this.props.statistics.slice(startId, endId);
      return rowsOnThisPage.map((row, index) => (
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
  }

  render() {
    const currPage = Number(this.props.currentPage);
    const numOfRows = this.props.statistics.length;
    const numOfPages = Math.ceil(numOfRows/this.props.rowsPerPage);
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
        <div className={styles.pagination}>
          <div>
            <RaisedButton 
              label="Previous" 
              onClick={this.props.changeCurrentPage} 
              value={currPage-1} />
            <RaisedButton 
              label="<<" 
              onClick={this.props.changeCurrentPage} 
              value={1} 
              className={styles.raisedButton} />
              {(currPage > 2) ? <p>...</p> : null}
              {(currPage > 1 ) ? 
                <RaisedButton 
                label={currPage-1} 
                onClick={this.props.changeCurrentPage} 
                value={currPage-1} 
                className={styles.raisedButton} /> 
              : null}
              <RaisedButton 
                primary 
                label={currPage} 
                onClick={this.props.changeCurrentPage} 
                value={currPage} 
                className={styles.raisedButton} />
              {(currPage < numOfPages) ? 
                <RaisedButton 
                  label={currPage+1} 
                  value={currPage+1} 
                  onClick={this.props.changeCurrentPage} 
                  className={styles.raisedButton} /> 
              : null}
              {(currPage < numOfPages-1 ) ? <p>...</p> : null}
            <RaisedButton 
              label=">>" 
              onClick={this.props.changeCurrentPage} 
              value={numOfPages} 
              className={styles.raisedButton} />
            <RaisedButton 
              label="Next" 
              onClick={this.props.changeCurrentPage} 
              value={currPage+1} />
          </div>
        </div>
      </div>
    );
  }
}

TableItself.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.string),
  statistics: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default TableItself;
