import React, { Component } from 'react';
import propTypes from 'prop-types';
import MessagesList from '../MessagesList/messagesList';
import styles from './styles.scss';
import notifications from '../../notifications/notifications';
import EmojiContainer from '../../emojiRender/EmojiContainer';

class ChatBody extends Component {
  constructor(props) {
    super(props);
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
    this.onFileInputChange = this.onFileInputChange.bind(this);
  }

  componentDidMount() {
    const input = document.getElementById('input');
    this.setState({ input });
  }

  componentWillReceiveProps(nextProps) {
    const messageNumProps = nextProps.messages.length;
    if (this.state.messageNum === 0) {
      this.setState({ messageNum: messageNumProps });
    } else if (this.state.messageNum !== messageNumProps) {
      this.setState({ messageNum: messageNumProps });
      const newMessage = nextProps.messages[messageNumProps - 1];
      const currentUser = window._injectedData.userId ?
        window._injectedData.userId.username : window._injectedData.username;
      if (newMessage.author.item.username !== currentUser) {
        notifications.api(newMessage);
        notifications.title();
      }
    }
  }

  onFileInputChange() {
    if (this.fileInput.files.length > 0) {
      this.filesCounter.innerHTML = this.fileInput.files.length;
    } else {
      this.filesCounter.innerHTML = '';
    }
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

  messageSubmit(event) {
    const text = this.state.text;
    this.props.onFormSubmit(event, text);
    this.setState({ text: '' });
  }

  render() {
    const operator = this.props.operator;
    const avatar = operator && (operator.user.avatar === 'avatar.png' ?
      'https://www.materialist.com/static/new_store/images/avatar_placeholder.svg' :
      operator.user.avatar);
    const operatorName = operator ? operator.user.username : 'Conversation hasn\'t been picked up';
    return (
      <div onClick={e => this.closeEmojiBlock(e)} role="presentation" className={styles.chat}>
        {operator ?
          <div className={styles['conversation-header']}>
            <img
              className={styles['return-button']}
              src="http://www.iconsdb.com/icons/preview/white/arrow-89-xxl.png"
              alt="return-button"
              onClick={this.props.onReturnButtonClick}
            />
            <img className={styles['operator-avatar']} alt="avatar" src={avatar} />
            <div className={styles['operator-name']}>{operatorName}</div>
          </div> :
          <div className={styles['conversation-header']}>
            <img
              className={styles['return-button']}
              src="http://www.iconsdb.com/icons/preview/white/arrow-89-xxl.png"
              alt="return-button"
              onClick={this.props.onReturnButtonClick}
            />
            <div className={styles['operator-name']}>{operatorName}</div>
          </div>
        }
        <MessagesList messages={this.props.messages} />
        <form
          className={styles['sending-form']}
          onSubmit={(event) => {
            this.messageSubmit(event);
          }}
        >
          <input
            id="file-input"
            name="fileInput"
            type="file"
            className={styles['file-input']}
            ref={(node) => {
              this.fileInput = node;
            }}
            onChange={this.onFileInputChange}
            multiple
          />
          <label htmlFor="file-input" className={styles['file-input-label']}>
            <span
              className={styles['selected-files-counter']}
              ref={(node) => {
                this.filesCounter = node;
              }}
            />
          </label>
          <input
            type="text"
            name="messageInput"
            className={styles['message-input']}
            onChange={(e) => {
              this.setTextIntoInput(e);
            }}
            value={this.state.text}
            onBlur={e => this.blurFromInput(e)}
            id="input"
          />
          <span
            onClick={e => this.toggleEmojiBlock(e)}
            className={styles['main_emo-menu']}
          >
            <i className={styles['emoji-block-icon']} />
          </span>
          <button className={styles['submit-button']} type="submit" />
        </form>
        {this.state.showEmojis ? <div
          tabIndex={0}
          onBlur={this.closeEmojiBlock}
          className={styles['emoji-block']}
        >
          <EmojiContainer setEmojiToInput={this.setEmojiToInput} />
        </div> : null}
      </div>
    );
  }
}

ChatBody.propTypes = {
  messages: propTypes.arrayOf(propTypes.shape({
    conversationId: propTypes.string,
    body: propTypes.oneOfType([propTypes.string, propTypes.shape({
      finalName: propTypes.string,
      fileName: propTypes.string,
      fileType: propTypes.string,
      isImage: propTypes.bool,
    })]).isRequired,
    author: propTypes.shape({
      item: propTypes.any,
      userType: propTypes.string,
    }),
    createdAt: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    editedAt: propTypes.number,
  })),
  onReturnButtonClick: propTypes.func.isRequired,
  onFormSubmit: propTypes.func.isRequired,
  operator: propTypes.shape({
    userType: propTypes.string,
    user: propTypes.object,
  }),
};

export default ChatBody;
