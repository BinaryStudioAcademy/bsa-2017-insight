import React from 'react';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
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
      username: 'User name',
      firstname: 'First name',
      lastname: 'Last name',
      rowsPerPage: 5,
      currentPage: 1,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }

  hoverRow(e) {
    console.log(e);
  }

  generateRows() {
    const numOfRows = this.props.statistics.length;
    const numOfPages = Math.ceil(numOfRows/this.state.rowsPerPage);
    if (numOfRows != 0){
      const startId = (this.state.currentPage-1)*this.state.rowsPerPage;
      const endId = (this.state.currentPage === numOfPages) ? numOfRows : (this.state.currentPage*this.state.rowsPerPage);
      const rowsOnThisPage = this.props.statistics.slice(startId, endId);
      console.log(rowsOnThisPage);
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

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleChange(event, index, value) {
    this.setState({
      rowsPerPage : value,
      currentPage: 1
    });
  }

  changeCurrentPage(event){
    const newPageNumber = Number(event.currentTarget.value);
    const numOfRows = this.props.statistics.length;
    const numOfPages = Math.ceil(numOfRows/this.state.rowsPerPage);
    if ((newPageNumber >= 1) && (newPageNumber <= numOfPages)) {
      this.setState({
        currentPage: event.currentTarget.value
      })
    }
  }

  render() {
    const actions = [
      <RaisedButton
        label="Save"
        primary={true}
        onClick={this.handleClose}
      />,
    ];
    const currPage = Number(this.state.currentPage);
    const numOfRows = this.props.statistics.length;
    const numOfPages = Math.ceil(numOfRows/this.state.rowsPerPage);
    return (
      <div className={styles.container} >
        <div className={styles.topPanel}>
          <div>
            <RaisedButton
              label="Columns Filter"
              onClick={this.handleOpen}
              primary={true}
              style={{
                marginBottom: '5px',
                background: this.props.chosenTheme.palette.primary1Color,
                color: this.props.chosenTheme.palette.alternateTextColor,
              }}
            />
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
          </div>
          <div className={styles.rowsPerPage}>
            <p>Rows per page:</p>
            <SelectField
              value={this.state.rowsPerPage}
              onChange={this.handleChange}
              style={{ width: '80px' }} >
              <MenuItem value={2} primaryText="2" />
              <MenuItem value={5} primaryText="5" />
              <MenuItem value={10} primaryText="10" />
              <MenuItem value={25} primaryText="25" />
              <MenuItem value={50} primaryText="50" />
            </SelectField>
          </div>
        </div>
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
              onClick={this.changeCurrentPage} 
              value={currPage-1} />
            <RaisedButton 
              label="<<" 
              onClick={this.changeCurrentPage} 
              value={1} 
              className={styles.raisedButton} />
              {(currPage > 2) ? <p>...</p> : null}
              {(currPage > 1 ) ? 
                <RaisedButton 
                label={currPage-1} 
                onClick={this.changeCurrentPage} 
                value={currPage-1} 
                className={styles.raisedButton} /> 
              : null}
              <RaisedButton 
                primary 
                label={currPage} 
                onClick={this.changeCurrentPage} 
                value={currPage} 
                className={styles.raisedButton} />
              {(currPage < numOfPages) ? 
                <RaisedButton 
                  label={currPage+1} 
                  value={currPage+1} 
                  onClick={this.changeCurrentPage} 
                  className={styles.raisedButton} /> 
              : null}
              {(currPage < numOfPages-1 ) ? <p>...</p> : null}
            <RaisedButton 
              label=">>" 
              onClick={this.changeCurrentPage} 
              value={currPage} 
              className={styles.raisedButton} />
            <RaisedButton 
              label="Next" 
              onClick={this.changeCurrentPage} 
              value={currPage+1} />
          </div>
        </div>
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
