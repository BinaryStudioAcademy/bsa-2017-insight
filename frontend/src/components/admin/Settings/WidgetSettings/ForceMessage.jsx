import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles.scss';

class ForceMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: '',
      body: '',
      timer: '10',
      visitedURLS: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event, property) {
    this.setState({ [property]: event.target.value });
  }
  onFormSubmit(event) {
    event.preventDefault();
    const forceMessage = {
      appId: window._injectedData.currentAppId,
      page: this.state.page,
      body: this.state.body,
      conditions: {
        timer: Number(this.state.timer) * 1000,
        visitedURLS: this.state.visitedURLS.split(',').map(path => path.trim()),
      },
    };
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(forceMessage),
    };
    fetch('http://localhost:3000/api/force-messages', requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  render() {
    return (
      <form className={styles['force-message-form']} onSubmit={this.onFormSubmit}>
        <h2 className={styles['force-message-form-header']}>Create force message</h2>
        <div>Target page:</div>
        <TextField
          className={styles['force-message-input']}
          hintText="Select page message will appear on"
          id="page"
          value={this.state.page}
          onChange={e => this.onInputChange(e, 'page')}
        />
        <div>Message to appear:</div>
        <TextField
          className={styles['force-message-input']}
          hintText="Message to pop up"
          id="body"
          value={this.state.body}
          onChange={e => this.onInputChange(e, 'body')}
          multiLine
          rowsMax={4}
        />
        <h3 className={styles['conditions-header']}>Conditions</h3>
        <div>Message timeout</div>
        <TextField
          type="number"
          className={styles['force-message-input']}
          hintText="Number of seconds"
          id="timer"
          value={this.state.timer}
          onChange={e => this.onInputChange(e, 'timer')}
        />
        <div>Visited pages</div>
        <TextField
          className={styles['force-message-input']}
          hintText="List of pages user has already visited"
          id="visitedURLS"
          value={this.state.visitedURLS}
          onChange={e => this.onInputChange(e, 'visitedURLS')}
        />
        <div className={styles['add-button-wrapper']}>
          <RaisedButton
            type="submit"
            className={styles['add-force-message-button']}
            label="Create"
            primary
          />
        </div>
      </form>
    );
  }
}

export default ForceMessage;
