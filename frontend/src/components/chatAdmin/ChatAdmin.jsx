import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';
import MessagesList from './MessagesList/MessagesList';
import { startSocketConnection } from './logic';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  componentDidMount() {
    startSocketConnection.call(this, this.props.dispatch);
  }

  handleMessageSubmit(event) {
    event.preventDefault();
    const eventCopy = event;
    const message = event.target.messageInput.value;
    const messageObj = {
      conversationId: this.props.conversationToRender._id,
      body: message,
      createdAt: Date.now(),
      author: {
        item: '598ef17257350736943d3c45', // window._injectedData.globalId || window._injectedData.userId._id;
        userType: 'Admin',
      },
    };
    this.socket.emit('newMessage', messageObj);
    eventCopy.target.messageInput.value = '';
  }

  render() {
    const conversationToRender = this.props.conversationToRender;
    const messages = conversationToRender ? conversationToRender.messages : null;
    return (
      <div className={styles.chat}>
        <MessagesList messages={messages} />
        <form className={styles['sending-form']} onSubmit={this.handleMessageSubmit}>
          <input
            type="text"
            name="messageInput"
            className={styles['message-input']}
            placeholder="Type yor message here.."
          />
          <button className={styles['submit-button']} type="submit">Send</button>
        </form>
      </div>
    );
  }
}

Chat.propTypes = {
  conversationToRender: propTypes.object,
  dispatch: propTypes.func,
};

export default Chat;
