import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ForceMessagesTable from './forceMesagesTable';
import styles from './styles.scss';
import { fetchForceMessages, deleteForceMessage, createForceMessage } from './../../../../actions/forceMessagesActions';

class ForceMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: '',
      body: 'How can I help you?',
      timer: '10',
      visitedURLS: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchForceMessages());
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
      timer: Number(this.state.timer) * 1000,
      conditions: {
        visitedURLS: this.state.visitedURLS.split(',').map(path => path.trim()),
      },
    };
    this.props.dispatch(createForceMessage(forceMessage));
    this.setState({
      page: '',
      body: 'How can I help you?',
      timer: '10',
      visitedURLS: '',
    });
  }

  onDeleteButtonClick(id) {
    this.props.dispatch(deleteForceMessage(id));
  }

  render() {
    return (
      <div className={styles['force-content-wrapper']}>
        <ForceMessagesTable
          forceMessages={this.props.forceMessages}
          onDeleteButtonClick={this.onDeleteButtonClick}
        />
        <form className={styles['force-message-form']} onSubmit={this.onFormSubmit}>
          <h2 className={styles['force-message-form-header']}>Create force message</h2>
          <div>Target page:</div>
          <TextField
            className={styles['force-message-input']}
            hintText="Select page/path"
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
          <div>Message timeout</div>
          <TextField
            type="number"
            className={styles['force-message-input']}
            hintText="Number of seconds"
            id="timer"
            value={this.state.timer}
            onChange={e => this.onInputChange(e, 'timer')}
          />
          <h3 className={styles['conditions-header']}>Conditions</h3>
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
      </div>
    );
  }
}

ForceMessage.propTypes = {
  forceMessages: propTypes.arrayOf(propTypes.shape({
    _id: propTypes.string,
    appId: propTypes.string,
    page: propTypes.string,
    body: propTypes.string,
    timer: propTypes.number,
    conditions: propTypes.object,
  })),
  dispatch: propTypes.func,
};

const mapDispatchToProps = state => ({ forceMessages: state.forceMessages.allForceMessages });

export default connect(mapDispatchToProps)(ForceMessage);
