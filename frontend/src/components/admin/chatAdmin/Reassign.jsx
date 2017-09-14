import React from 'react';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import propTypes from 'prop-types';
import styles from './styles.scss';

export default class Reassign extends React.Component {
  constructor(props) {
    super(props);
    this.findUsers = this.findUsers.bind(this);
    this.reassign = this.reassign.bind(this);
    this.setAdminGroups = this.setAdminGroups.bind(this);
    this.state = {
      open: false,
      adminGroups: 'all',
    };
  }

  componentDidMount() {
    document.getElementById('userInput').focus();
    const reassignHandler = (response) => {
      if(response.ok) {
        return this.props.updateConversationParticipants(response.newParticipant);
      }
      this.setState({
        reassignResponse: response.message,
        open: true,
      });
    };
    this.props.socket.on('reassign response', reassignHandler);
    this.findUsers();
  }

  componentWillUnmount() {
    this.props.socket.off('reassign response');
  }

  handleSnackbarOpen() {
    this.setState({
      open: true,
    });
  }

  findUsers(value) {
    fetch('/api/admins/search', { 
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ username: value || '', adminGroups: this.state.adminGroups }),
    })
      .then((response) => {
        return response.json();
      }).then((response) => {
        return this.setState({ users: response });
      });
  }

  reassign(e) {
    const user = this.state.users.find((user) => {
      if (user.username === e.currentTarget.id) return true;
      return false;
    });
    const newUser = {
      user: user._id,
      userType: 'Admin',
    };

    this.props.socket.emit('reassign conversation', {
      conversationId: this.props.conversationId,
      currentUserId: window._injectedData._id,
      newUser,
    });
  }

  setAdminGroups(e) {
    this.setState({
      adminGroups: e.target.value,
    }, () => {
      this.findUsers();
    });
  }

  render() {
    return (
      <div style={{ padding: '5px' }}>
        <Snackbar
            open={this.state.open}
            message={this.state.reassignResponse || ''}
            autoHideDuration={1600}
            contentStyle={{ fontSize: '13px' }}
            style={{ position: 'absolute' }}
        />
        <div>
          <label style={{ cursot: 'pointer ', margin: '2px 5px' }}>
            <input
              type={'radio'}
              name={'adminGroups'}
              value={'all'}
              checked={this.state.adminGroups === 'all'}
              onChange={this.setAdminGroups}
            />
            All
          </label>
          <label style={{ cursot: 'pointer ', margin: '2px 5px' }}>
            <input
              type={'radio'}
              name={'adminGroups'}
              value={'general'}
              checked={this.state.adminGroups === 'general'}
              onChange={this.setAdminGroups}
            />
            General
          </label>
          <label style={{ cursot: 'pointer ', margin: '2px 5px' }}>
            <input
              type={'radio'}
              name={'adminGroups'}
              value={'technical'}
              checked={this.state.adminGroups === 'technical'}
              onChange={this.setAdminGroups}
            />
            Technical
          </label>
        </div>
        <TextField
          hintText={'Username'}
          onChange={(e) => this.findUsers(e.target.value)}
          id={'userInput'}
        />
        <div className={'users-list'}>
          <List>
            {
              this.state.users && this.state.users.map((user) => {
                return (
                  <ListItem
                    primaryText={`${user.firstName} ${user.lastName}`}
                    secondaryText={user.username}
                    onClick={this.reassign}
                    id={user.username}
                    key={user._id}
                  />
                );
              })
            }
          </List>
        </div>
      </div>
    );
  }
}

Reassign.propTypes = {
  socket: propTypes.shape({
    on: propTypes.func,
    emit: propTypes.func,
  }),
  conversationId: propTypes.string,
};