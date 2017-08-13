import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import styles from './styles.scss';
import MessagesList from './MessagesList/MessagesList';
import { findConversationById, startSocketConnection } from './logic';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  componentDidMount() {
    //  const id = window._injectedData.globalId || window._injectedData.userId._id;
    startSocketConnection.call(this, this.props.dispatch);
  }

  handleMessageSubmit(event) {
    event.preventDefault();
    const eventCopy = event;
    const message = event.target.messageInput.value;
    const messageObj = {
      conversationId: this.props.admin.conversations[0]._id,
      body: message,
      createdAt: Date.now(),
      author: {
        item: '598ef17257350736943d3c45',
        userType: 'Admin',
      },
    };
    this.socket.emit('newMessage', messageObj);
    eventCopy.target.messageInput.value = '';
  }

  render() {
    const conversations = this.props.admin && this.props.admin.conversations;
    const conversationId = this.props.admin && this.props.admin.conversations[0]._id;
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

Chat.propTypes = {
  admin: propTypes.object,
  dispatch: propTypes.func,
};

const mapStateToProps = state => ({
  admin: state.admin,
});


export default connect(mapStateToProps)(Chat);
