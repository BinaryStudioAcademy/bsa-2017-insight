import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { connect } from 'react-redux';
import styles from './styles.scss';
import Filter from '../Filter/Filter';
import TableItself from './TableItself';
import { addSelection } from '../../../actions/selectionActions';

class UserInfoTable extends React.Component {
  constructor() {
    super();
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.state = {
      open: false,
      selDialogOpen: false,
      rowsPerPage: 5,
      currentPage: 1,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleChangeRowsPerPage(event, index, value) {
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

  toggleSelectionDialog() {
    this.setState({ selDialogOpen: !this.state.selDialogOpen });
  }


  render() {
    const actions = [
      <RaisedButton
        label="Save"
        primary
        onClick={this.handleClose}
      />,
    ];
    return (
      <div className={styles.container} >
        <div className={styles.topPanel}>
          <div>
            <RaisedButton
              label="Columns Filter"
              onClick={this.handleOpen}
              primary
              style={{ margin: '0 5px 10px 0' }}
            />
            <Dialog
              title="Columns Filter"
              actions={actions}
              modal
              open={this.state.open}
              bodyStyle={{ overflowX: 'hidden' }}
            >
              <Filter
                selectedFields={this.props.selectedFields}
                statisticOptions={this.props.statisticOptions}
                updateFields={this.props.updateFields}
              />
            </Dialog>
            <RaisedButton
              label="Create a selection"
              onClick={() => this.toggleSelectionDialog(this.state.selDialogOpen)}
              primary
              style={{ margin: '0 5px 10px 0' }}
            />
            <Dialog
              title="Create a selection"
              modal
              open={this.state.selDialogOpen}
              contentStyle={{ textAlign: 'center', margin: '0 auto' }}
              bodyStyle={{ overflowX: 'hidden', textAlign: 'center' }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const name = document.getElementById('selection-name').value;
                  const description = document.getElementById('selection-description').value;
                  this.props.addSelection(name, description, this.props.statistics);
                  this.toggleSelectionDialog(this.state.selDialogOpen);
                }}
              >
                <TextField
                  hintText="Name"
                  required
                  id="selection-name"
                /><br />
                <TextField
                  hintText="Description (optional)"
                  id="selection-description"
                  style={{ marginBottom: 30 }}
                /><br />
                <FlatButton
                  label="Cancel"
                  onClick={() => this.toggleSelectionDialog(this.state.selDialogOpen)}
                />
                <FlatButton
                  label="Create"
                  type="submit"
                />
              </form>
            </Dialog>
          </div>
          <div className={styles.rowsPerPage}>
            <p>Rows per page:</p>
            <SelectField
              value={this.state.rowsPerPage}
              onChange={this.handleChangeRowsPerPage}
              style={{ width: '80px' }} >
              <MenuItem value={2} primaryText="2" />
              <MenuItem value={5} primaryText="5" />
              <MenuItem value={10} primaryText="10" />
              <MenuItem value={25} primaryText="25" />
              <MenuItem value={50} primaryText="50" />
            </SelectField>
          </div>
        </div>
        <TableItself
          statistics={this.props.statistics}
          options={this.props.options}
          rowsPerPage={this.state.rowsPerPage}
          currentPage={this.state.currentPage}
          changeCurrentPage={this.changeCurrentPage}
        />
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
  addSelection: React.PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSelection: (name, description, users) => {
      const filteredUsersIds = users.filter(user => user.userId.email).map(user => user.userId._id);
      const body = JSON.stringify({ name, description, users: filteredUsersIds, appId: window._injectedData.appId });
      return dispatch(addSelection(body));
    },
  };
};

export default connect(null, mapDispatchToProps)(UserInfoTable);
