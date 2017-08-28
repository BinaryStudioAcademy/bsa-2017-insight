import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';
import MessagesList from './MessagesList/MessagesList';
import { startSocketConnection } from './logic';
import notifications from '../../notifications/notifications';
import EmojiContainer from '../../emojiRender/EmojiContainer';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.state = {
      messageNum: 0,
      text: '',
      showEmojis: false,
      selectionStart: null,
      selectionEnd: null,
      input: null,
    };
    this.setTextIntoInput = this.setTextIntoInput.bind(this);
    this.toggleEmojiBlock = this.toggleEmojiBlock.bind(this);
    this.closeEmojiBlock = this.closeEmojiBlock.bind(this);
    this.blurFromInput = this.blurFromInput.bind(this);
    this.setEmojiToInput = this.setEmojiToInput.bind(this);
    this.focusToInput = this.focusToInput.bind(this);
    this.messageSubmit = this.messageSubmit.bind(this);
  }

  componentDidMount() {
    const conversation = this.props.conversationToRender;
    startSocketConnection.call(this, this.props.dispatch, conversation.messages, conversation._id);
    const input = document.getElementById('input');
    this.setState({ input });
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

  setTextIntoInput(e) {
    this.setState({ text: e.target.value });
  }

  setEmojiToInput(emojiName) {
    const startSelIndex = this.state.selectionStart;
    const endSelIndex = this.state.selectionEnd;
    const text = this.state.text;
    let result = null;
    if (startSelIndex === endSelIndex) {
      result = text.slice(0, startSelIndex) + emojiName + text.slice(startSelIndex, text.length);
      const lastIndex = result.lastIndexOf(emojiName) + emojiName.length;
      this.focusToInput();
      this.setState({ text: result, selectionStart: lastIndex, selectionEnd: lastIndex });
    } else {
      result = text.slice(0, startSelIndex) + emojiName + text.slice(endSelIndex, text.length);
      const lastIndex = result.lastIndexOf(emojiName) + emojiName.length;
      this.focusToInput();
      this.setState({ text: result, selectionStart: lastIndex, selectionEnd: lastIndex });
    }
  }

  blurFromInput(e) {
    this.setState({ input: e.target, selectionStart: e.target.selectionStart, selectionEnd: e.target.selectionEnd });
  }

  handleMessageSubmit(message) {
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
    notifications.email(messageObj);
  }

  focusToInput() {
    const input = this.state.input;
    input.focus();
  }
  toggleEmojiBlock(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showEmojis: !this.state.showEmojis });
  }

  closeEmojiBlock(e) {
    e.stopPropagation();
    if (this.state.showEmojis) {
      this.setState({ showEmojis: false });
    }
  }

  messageSubmit(e) {
    e.preventDefault();
    const text = this.state.text;
    this.handleMessageSubmit(text);
    this.setState({ text: '' });
  }

  render() {
    const conversationToRender = this.props.conversationToRender;
    const messages = conversationToRender ? conversationToRender.messages : null;
    return (
      <div className={styles.chat} role="presentation" onClick={e => this.closeEmojiBlock(e)} >
        <MessagesList messages={messages} chosenTheme={this.props.chosenTheme} />
        <form className={styles['sending-form']}>
          <input
            type="text"
            name="messageInput"
            className={styles['message-input']}
            onChange={(e) => { this.setTextIntoInput(e); }}
            value={this.state.text}
            onBlur={e => this.blurFromInput(e)}
            id="input"
          />
          <button
            onClick={e => this.toggleEmojiBlock(e)}
            className={styles['main_emo-menu']}
          >
            <i className={styles['emoji-block-icon']} />
          </button>
          <button className={styles['submit-button']} onClick={e => this.messageSubmit(e)}>Send</button>
        </form>
        {this.state.showEmojis ? <div
          tabIndex={0}
          onBlur={this.closeEmojiBlock}
          className={styles['emoji-block']}
        >
          <EmojiContainer setEmojiToInput={this.setEmojiToInput} />
        </div> : null }
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

