import React, { Component } from 'react';
import propTypes from 'prop-types';
import MessagesList from '../MessagesList/messagesList';
import styles from './styles.scss';
import notifications from '../../../notifications/notifications';

class ChatBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageNum: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const messageNumProps = nextProps.messages.length;
    if (this.state.messageNum === 0) {
      this.setState({ messageNum: messageNumProps });
    } else if (this.state.messageNum !== messageNumProps) {
      this.setState({ messageNum: messageNumProps });
      const newMessage = nextProps.messages[messageNumProps - 1];
      const currentUser = window._injectedData.userId ? window._injectedData.userId.username : window._injectedData.username;
      if (newMessage.author.item.username !== currentUser) {
        notifications.api(newMessage);
        notifications.title();
      }
    }
  }

  render() {
    return (
      <div className={styles.chat}>
        <img
          alt="return-button"
          src="https://www.shareicon.net/data/512x512/2016/08/18/809860_arrows_512x512.png"
          className={styles['return-button']}
          onClick={this.props.onReturnButtonClick}
          role="button"
          tabIndex="0"
        />
        <MessagesList messages={this.props.messages} />
        <form className={styles['sending-form']} onSubmit={event => this.props.onMessageSubmit(event)}>
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

ChatBody.propTypes = {
  messages: propTypes.arrayOf(propTypes.shape({
    conversationId: propTypes.string.isRequired,
    body: propTypes.string.isRequired,
    author: propTypes.shape({
      item: propTypes.any,
      userType: propTypes.string
    }),
    createdAt: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    editedAt: propTypes.number
  })),
  onMessageSubmit: propTypes.func.isRequired,
  onReturnButtonClick: propTypes.func.isRequired
};

export default ChatBody;
