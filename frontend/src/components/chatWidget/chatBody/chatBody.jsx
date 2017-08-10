import React, { Component } from 'react';
import propTypes from 'prop-types';
import MessagesList from './../messagesList/messagesList';
import styles from './styles.scss';
import io from './../../../../../node_modules/socket.io-client/dist/socket.io';

class ChatWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('user connected', () => {
      console.log('connected to the server succesfully');
    });
  }

  render() {
    return (
      <div className={styles.chat}>
        <div className={styles.closeButton} onClick={this.props.onChatClose} role="button" tabIndex="0" />
        <MessagesList messages={this.state.messages} />
        <form className={styles.sendingForm}>
          <input type="text" className={styles.messageInput} placeholder="Type yor message here.." />
          <button className={styles.submitButton} type="submit">Send</button>
        </form>
      </div>
    );
  }
}

ChatWidget.propTypes = {
  onChatClose: propTypes.func.isRequired,
};

export default ChatWidget;
