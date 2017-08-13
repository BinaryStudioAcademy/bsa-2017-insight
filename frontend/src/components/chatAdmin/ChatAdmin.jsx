import React, { Component } from 'react';
import styles from './styles.scss';
import MessagesList from './MessagesList/MessagesList';
import { findConversationById, startSocketConnection } from './logic';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  componentDidMount() {
    //  const id = window._injectedData.globalId || window._injectedData.userId._id;
    startSocketConnection.call(this);
  }

  handleMessageSubmit(event) {
    event.preventDefault();
    const eventCopy = event;
    const message = event.target.messageInput.value;
    const messageObj = {
      conversationId: this.state.admin.conversations[0]._id,
      body: message,
      createdAt: Date.now(),
      author: {
        item: '598ef17257350736943d3c45',
        userType: '598ef17257350736943d3c45',
      },
    };
    this.socket.emit('newMessage', messageObj);
    eventCopy.target.messageInput.value = '';
  }

  render() {
    const conversations = this.state.admin && this.state.admin.conversations;
    const conversationId = this.state.admin && this.state.admin.conversations[0]._id;
    const conversationToRender = findConversationById(conversationId, conversations);
    const messages = conversationToRender ? conversationToRender.item.messages : null;
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



export default Chat;
