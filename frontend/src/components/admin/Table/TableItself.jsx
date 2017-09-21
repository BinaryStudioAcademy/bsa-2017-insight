import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import parseService from './parseService';
import styles from './styles.scss';
import Filter from '../Filter/Filter';

class TableItself extends React.Component {
  constructor() {
    super();
    this.state = {
      firstVisitDate: 'First Visit',
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
      columnsFilterOpen: false,
    };
    this.handleColumnsFilter = this.handleColumnsFilter.bind(this);
  }

  hoverRow(e) {
    console.log(e);
  }

  generateRows() {
    const currPage = this.props.currentPage;
    const rowsPerPage = this.props.rowsPerPage;
    const numOfRows = this.props.statistics.length;
    const numOfPages = Math.ceil(numOfRows / rowsPerPage);
    if (numOfRows !== 0) {
      const startId = (currPage - 1) * rowsPerPage;
      const endId = (currPage === numOfPages) ? numOfRows : (currPage * rowsPerPage);
      const rowsOnThisPage = this.props.statistics.slice(startId, endId);
      return rowsOnThisPage.map((row, index) => (
        <tr key={`row ${row.userId._id}`} value={row} className={styles.rows} style={{ borderBottom: '1px solid #E0F7FA' }}>
          <td
            key={`row number ${row.userId._id}`}
            style={{ textAlign: 'center' }}
          >
            <span>{index + 1}</span>
          </td>
          {
            this.props.options.map((elem) => {
              if (elem === 'username') {
                return (<td
                  key={`row ${row.userId._id},column${elem}`}
                >
                  <span>{row.userId.username}</span>
                </td>);
              }
              if (elem === 'firstname') {
                return (<td
                  key={`row ${row.userId._id},column${elem}`}
                >
                  <span>{row.userId.firstName}</span>
                </td>);
              }
              if (elem === 'lastname') {
                return (<td
                  key={`row ${row.userId._id},column${elem}`}
                >
                  <span>{row.userId.lastName}</span>
                </td>);
              }

              if (elem === 'firstVisitDate') {
                return (<td
                  key={`row ${row.userId._id},column${elem}`}
                >
                  <span>{(new Date(row.firstVisitDate)).toDateString()}</span>
                </td>);
              }
              if (elem === 'country') {
                return (<td
                  key={`row ${row.userId._id},column${elem}`}
                  className={styles['text-center']}
                >
                  {parseService.flag(row[elem])}
                </td>);
              }
              if (elem === 'browser') {
                return (<td
                  key={`row ${row.userId._id},column${elem}`}
                  className={styles['text-center']}
                >
                  {parseService.browser(row[elem])}
                </td>);
              }
              if (elem === 'os') {
                return (<td
                  key={`row ${row.userId._id},column${elem}`}
                  className={styles['text-center']}
                >
                  {parseService.os(row[elem])}

                </td>);
              }
              return (<td
                key={`row ${row.userId._id},column${elem}`}
              >
                <span>{row[elem]}</span>
              </td>);
            })
          }
        </tr>
      ));
    }
    return undefined;
  }

  handleColumnsFilter() {
    this.setState({
      columnsFilterOpen: !this.state.columnsFilterOpen,
    });
  }

  render() {
    const currPage = Number(this.props.currentPage);
    const numOfRows = this.props.statistics.length;
    const numOfPages = Math.ceil(numOfRows / this.props.rowsPerPage);
    return (
      <div className={styles.table} >
        <div className={styles.tableItself}>
          <table>
            <thead className={styles.tableHeader}>
              <tr>
                <th style={{ padding: '0px' }}>
                  <Filter
                    selectedFields={this.props.options}
                    updateFields={this.props.updateFields}
                  />
                </th>
                {this.props.options.map((elem) => {
                    if (elem === 'browser' || elem === 'country' || elem === 'os') {
                      return (<th
                      key={elem}
                      className={styles['text-center']}
                    >
                      {this.state[elem]}
                    </th>);
                  }
                  return (<th
                    key={elem}
                  >
                    {this.state[elem]}
                  </th>);
                })}
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {
                this.generateRows()
              }
            </tbody>
          </table>
        </div>
        <div className={styles.pagination}>
          <div className={styles['pagination-buttons-wrapper']}>
            <RaisedButton
              className={styles.raisedButton}
              label="Previous"
              onClick={this.props.changeCurrentPage}
              value={currPage - 1}
            />
            <RaisedButton
              label="<<"
              onClick={this.props.changeCurrentPage}
              value={1}
              className={styles.raisedButton}
            />
            {(currPage > 2) ? <p>...</p> : null}
            {(currPage > 1)
              ? <RaisedButton
                label={currPage - 1}
                onClick={this.props.changeCurrentPage}
                value={currPage - 1}
                className={styles.raisedButton}
              />
              : null}
            <RaisedButton
              primary
              label={currPage}
              onClick={this.props.changeCurrentPage}
              value={currPage}
              className={styles.raisedButton}
            />
            {(currPage < numOfPages) ?
              <RaisedButton
                label={currPage + 1}
                value={currPage + 1}
                onClick={this.props.changeCurrentPage}
                className={styles.raisedButton}
              />
              : null}
            {(currPage < numOfPages - 1) ? <p>...</p> : null}
            <RaisedButton
              label=">>"
              onClick={this.props.changeCurrentPage}
              value={numOfPages}
              className={styles.raisedButton}
            />
            <RaisedButton
              label="Next"
              onClick={this.props.changeCurrentPage}
              value={currPage + 1}
            />
          </div>
        </div>
      </div>
    );
  }
}

TableItself.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.string),
  statistics: React.PropTypes.arrayOf(React.PropTypes.object),
  changeCurrentPage: PropTypes.func,
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowsPerPage: PropTypes.number,
  updateFields: PropTypes.func,
};

export default TableItself;
