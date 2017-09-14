import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { connect } from 'react-redux';
import SyncIcon from 'material-ui/svg-icons/notification/sync';
import styles from './styles.scss';
import TableItself from './TableItself';
import { addSelection } from '../../../actions/selectionActions';

class UserInfoTable extends React.Component {
  constructor() {
    super();
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.updateFields = this.updateFields.bind(this);

    this.state = {
      open: false,
      selDialogOpen: false,
      selDialogPending: false,
      rowsPerPage: 5,
      currentPage: 1,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
    this.props.updateFields(this.state.fieldsToUpdate);
  }

  handleChangeRowsPerPage(event, index, value) {
    this.setState({
      rowsPerPage: value,
      currentPage: 1,
    });
  }

  changeCurrentPage(event) {
    const newPageNumber = Number(event.currentTarget.value);
    const numOfRows = this.props.statistics.length;
    const numOfPages = Math.ceil(numOfRows / this.state.rowsPerPage);
    if ((newPageNumber >= 1) && (newPageNumber <= numOfPages)) {
      this.setState({
        currentPage: event.currentTarget.value,
      });
    }
  }

  toggleSelectionDialog() {
    this.setState({ selDialogOpen: !this.state.selDialogOpen });
  }

  updateFields(fields) {
    this.setState({ fieldsToUpdate: fields });
  }

  render() {
    // const actions = [
    //   <RaisedButton
    //     label="Save"
    //     primary
    //     onClick={this.handleClose}
    //   />,
    // ];
    return (
      <div className={styles.container} style={{ width: '74vw' }}>
        <div className={styles.topPanel}>
          <div className={styles['table-buttons-wrapper']}>
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
              <span>Warning: Selection will only include users with email avaible</span>
              <form
                style={{ margin: '20px 0 0' }}
                onSubmit={(e) => {
                  e.preventDefault();
                  const name = document.getElementById('selection-name').value;
                  this.setState({ selDialogPending: true });
                  this.props.addSelection(
                    name,
                    this.props.statistics,
                    () => {
                      this.toggleSelectionDialog(this.state.selDialogOpen);
                      this.setState({ selDialogPending: false });
                    },
                  );
                }}
              >
                <TextField
                  hintText="Name"
                  required
                  id="selection-name"
                /><br />
                <FlatButton
                  label="Cancel"
                  onClick={() => this.toggleSelectionDialog(this.state.selDialogOpen)}
                />
                <FlatButton
                  type={this.state.selDialogPending ? 'button' : 'submit'}
                  label={this.state.selDialogPending ? '' : 'Create'}
                  icon={this.state.selDialogPending ? <SyncIcon className={styles['sync-icon']} /> : ''}
                />
              </form>
            </Dialog>
          </div>
          <div className={styles.rowsPerPage}>
            <p>Rows per page:</p>
            <SelectField
              value={this.state.rowsPerPage}
              onChange={this.handleChangeRowsPerPage}
              style={{ width: '80px' }}
            >
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
  updateFields: React.PropTypes.func,
  addSelection: React.PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSelection: (name, users, cb) => {
      const filteredUsersIds = users.filter(user => user.userId && user.userId.email);
      const body = JSON.stringify({ name, users: filteredUsersIds, appId: window._injectedData.appId });
      return dispatch(addSelection(body, cb));
    },
  };
};

export default connect(null, mapDispatchToProps)(UserInfoTable);
