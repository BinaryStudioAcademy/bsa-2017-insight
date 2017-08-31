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
      rowsPerPage: 2,
      currentPage: 1,
      numOfPages: null,
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

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleChange(event, index, value) {
    this.setState({rowsPerPage : value});
    this.someFunc();
  }

  changeCurrentPage(event){
    if ((Number(event.currentTarget.value) >= 1) && (Number(event.currentTarget.value) <= this.state.numOfPages)) {
      this.setState({
        currentPage: event.currentTarget.value
      })
    }
  }

  someFunc(){
    const numOfRows = this.props.statistics.length;
    const numOfPages = Math.ceil(numOfRows/this.state.rowsPerPage);
    this.setState({numOfPages: numOfPages});
    for (let i = 0; i < this.state.rowsPerPage; i++){
      let index = (this.state.currentPage-1)*this.state.rowsPerPage;
      if ((index + i) > numOfRows)
        break;
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
    return (
      <div className={styles.container} >
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




        <div>
          <RaisedButton label="Previous" value={Number(this.state.currentPage)-1} onClick={this.changeCurrentPage} />
          <RaisedButton label="<<" value={1} onClick={this.changeCurrentPage} />
            {(this.state.currentPage > 2) ? <p style={{ display: 'inline' }}>...</p> : null}
            {(this.state.currentPage > 1 ) ? <RaisedButton label={Number(this.state.currentPage)-1} value={Number(this.state.currentPage)-1} onClick={this.changeCurrentPage} /> : null}
            <RaisedButton label={Number(this.state.currentPage)} value={Number(this.state.currentPage)} onClick={this.changeCurrentPage} />
            {(this.state.currentPage < this.state.numOfPages) ? <RaisedButton label={Number(this.state.currentPage)+1} value={Number(this.state.currentPage)+1} onClick={this.changeCurrentPage} /> : null}
            {(this.state.currentPage < this.state.numOfPages-1 ) ? <p style={{ display: 'inline' }}>...</p> : null}
          <RaisedButton label=">>" value={Number(this.state.numOfPages)} onClick={this.changeCurrentPage} />
          <RaisedButton label="Next" value={Number(this.state.currentPage)+1} onClick={this.changeCurrentPage} />
          <SelectField
            floatingLabelText="Number of rows per page"
            value={this.state.rowsPerPage}
            onChange={this.handleChange}>
            <MenuItem value={2} primaryText="2" />
            <MenuItem value={5} primaryText="5" />
            <MenuItem value={10} primaryText="10" />
          </SelectField>
        </div>
      </div>
    );
  }
}

var currentPage = 2;
var numOfPages = 6;

UserInfoTable.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.string),
  statistics: React.PropTypes.arrayOf(React.PropTypes.object),
  statisticOptions: React.PropTypes.arrayOf(React.PropTypes.string),
  selectedFields: React.PropTypes.arrayOf(React.PropTypes.string),
  updateFields: React.PropTypes.func,
};

export default UserInfoTable;
