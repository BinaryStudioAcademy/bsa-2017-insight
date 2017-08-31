import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import styles from './styles.scss';
import Filter from '../Filter/Filter';
import TableItself from './TableItself';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { addSelection } from '../../../actions/selectionActions';

class UserInfoTable extends React.Component {
  constructor() {
    super();
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      open: false,
      selDialogOpen: false,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  toggleSelectionDialog() {
    this.setState({ selDialogOpen: !this.state.selDialogOpen });
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
          primary
          style={{ margin: '0 5px 10px 0' }}
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
            /><br />
            <FlatButton
              label="Cancel"
              onClick={() => this.toggleSelectionDialog(this.state.selDialogOpen)}
            />,
            <FlatButton
              label="Create"
              type="submit"
            />
          </form>
        </Dialog>
        <TableItself
          statistics={this.props.statistics}
          options={this.props.options}
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSelection: (name, description, users) => {
      const filteredUsersIds = users.filter(user => user.userId.email).map(user => user.userId._id);
      const body = JSON.stringify({ name, description, users: filteredUsersIds });
      return dispatch(addSelection(body));
    },
  };
};

export default connect(null, mapDispatchToProps)(UserInfoTable);
