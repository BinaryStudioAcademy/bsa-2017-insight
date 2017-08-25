import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';
import MessagesList from './MessagesList/MessagesList';
import { startSocketConnection } from './logic';
import notifications from '../../notifications/notifications';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.state = {
      messageNum: 0,
    };
  }

  componentDidMount() {
    const conversation = this.props.conversationToRender;
    startSocketConnection.call(this, this.props.dispatch, conversation.messages, conversation._id);
  }
  componentWillReceiveProps(nextProps) {
    const oldConversationId = this.props.conversationToRender._id;
    if (nextProps.conversationToRender._id !== oldConversationId) {
      if (nextProps.conversationToRender._id) this.socket.emit('switchRoom', nextProps.conversationToRender._id);
      this.socket.emit('messagesReceived', { type: 'Admin', messages: nextProps.conversationToRender.messages });
    }
    // Notifications
    const messageNumProps = nextProps.conversationToRender.messages.length;
    if (this.state.messageNum === 0) {
      this.setState({ messageNum: messageNumProps });
    } else if (this.state.messageNum !== messageNumProps) {
      const newMessage = nextProps.conversationToRender.messages[messageNumProps - 1];
      const currentUser = window._injectedData.userId ?
        window._injectedData.userId.username : window._injectedData.username;
      this.setState({ messageNum: messageNumProps });
      if (newMessage.author.item.username !== currentUser) {
        notifications.api(newMessage);
        notifications.title();
      }
    }
  }

  componentWillUnmount() {
    this.socket.emit('switchRoom', '');
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
        item: window._injectedData._id,
        userType: 'Admin',
      },
      isReceived: false,
    };
    this.socket.emit('newMessage', messageObj);
    eventCopy.target.messageInput.value = '';
    notifications.email(messageObj);
  }

  render() {
    const conversationToRender = this.props.conversationToRender;
    const messages = conversationToRender ? conversationToRender.messages : null;
    return (
      <div className={styles.chat}>
        <MessagesList messages={messages} chosenTheme={this.props.chosenTheme} />
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
  conversationToRender: propTypes.shape({
    _id: propTypes.string.isRequired,
    participants: propTypes.arrayOf(propTypes.shape({
      userType: propTypes.string,
      user: propTypes.any,
    })).isRequired,
    messages: propTypes.arrayOf(propTypes.any).isRequired,
    open: propTypes.bool,
    createdAt: propTypes.oneOfType([propTypes.number, propTypes.string]),
  }),
  dispatch: propTypes.func,
};

export default Chat;

