import React, { Component } from 'react';
import propTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles.scss';
import MessagesList from './MessagesList/MessagesList';
// import notifications from '../../notifications/notifications';
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
      filesCounter: 'Select file',
    };
    this.setTextIntoInput = this.setTextIntoInput.bind(this);
    this.toggleEmojiBlock = this.toggleEmojiBlock.bind(this);
    this.closeEmojiBlock = this.closeEmojiBlock.bind(this);
    this.blurFromInput = this.blurFromInput.bind(this);
    this.setEmojiToInput = this.setEmojiToInput.bind(this);
    this.focusToInput = this.focusToInput.bind(this);
    this.messageSubmit = this.messageSubmit.bind(this);
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.pickConversation = this.pickConversation.bind(this);
  }

  componentDidMount() {
    const conversation = this.props.conversationToRender;
    const currentAdmin = window._injectedData;

    this.props.socketConnection.emit('adminConnectedToRoom', conversation._id);
    this.props.socketConnection.emit('messagesReceived', { type: 'Admin', messages: conversation.messages });
    const input = document.getElementById('input');
    this.setState({ input });

    let isParticipant = conversation.participants.find((participant) => {
      return participant.user._id === currentAdmin._id;
    });

    this.setState({
      isInputEnabled: isParticipant ? true : false,
      showPickBtn: conversation.participants.length === 1 ? true : false,
    }, () => {
      console.log(this.state);
    });

  }

  componentWillReceiveProps(nextProps) {
    const oldConversationId = this.props.conversationToRender._id;
    const newConversation = nextProps.conversationToRender;
    const currentAdmin = window._injectedData;

    if (nextProps.conversationToRender._id !== oldConversationId) {
      if (nextProps.conversationToRender._id) this.props.socketConnection.emit('switchRoom', nextProps.conversationToRender._id);
      this.props.socketConnection.emit('messagesReceived', { type: 'Admin', messages: nextProps.conversationToRender.messages });
    }

    let isParticipant = newConversation.participants.find((participant) => {
      return participant.user._id === currentAdmin._id;
    });
    console.log(newConversation, isParticipant);
    this.setState({
      isInputEnabled: isParticipant ? true : false,
      showPickBtn: newConversation.participants.length === 1 ? true : false,
      info: '',
    }, () => {
      console.log(this.state);
    });

    // Notifications
    // const messageNumProps = nextProps.conversationToRender.messages.length;
    // if (this.state.messageNum === 0) {
    //   this.setState({ messageNum: messageNumProps });
    // } else if (this.state.messageNum !== messageNumProps) {
    //   const newMessage = nextProps.conversationToRender.messages[messageNumProps - 1];
    //   const currentUser = window._injectedData.userId ?
    //     window._injectedData.userId.username : window._injectedData.username;
    //   this.setState({ messageNum: messageNumProps });
    //   if (newMessage.author.item.username !== currentUser) {
    //     notifications.api(newMessage);
    //     notifications.title();
    //   }
    // }
  }

  componentWillUnmount() {
    this.props.socketConnection.emit('switchRoom', '');
  }

  onFileInputChange() {
    if (this.fileInput.files.length === 1) {
      this.setState({ filesCounter: this.fileInput.files[0].name });
    } else if (this.fileInput.files.length > 1) {
      this.setState({ filesCounter: `Selected files: ${this.fileInput.files.length}` });
    } else {
      this.setState({ filesCounter: 'Select file' });
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

  handleMessageSubmit(event, text) {
    const eventCopy = event;
    const message = text;
    const files = [...event.target.fileInput.files];
    if (files.length === 0) {
      if (message === '') return;
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
      this.props.socketConnection.emit('newMessage', messageObj);
      // notifications.email(messageObj);
    } else if (files.length > 0 && message === '') {
      files.forEach((file) => {
        const formData = new FormData();
        formData.append('codename', file);
        const options = {
          method: 'POST',
          body: formData,
        };
        fetch('http://localhost:3000/api/uploads', options)
          .then(resp => resp.json())
          .then((data) => {
            const regex = /(png|gif|jpeg|jpg|bmp|tiff|svg)$/i;
            const objectToSend = data;
            objectToSend.isImage = data.fileType.match(regex) !== null;
            const messageObj = {
              conversationId: this.props.conversationToRender._id,
              body: objectToSend,
              createdAt: Date.now(),
              author: {
                item: window._injectedData._id,
                userType: 'Admin',
              },
              isReceived: false,
            };
            this.props.socketConnection.emit('newMessage', messageObj);
          });
      });
      eventCopy.target.reset();
      this.setState({ filesCounter: 'Select file' });
    }
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
    event.preventDefault();
    const text = this.state.text;
    this.handleMessageSubmit(event, text);
    this.setState({ text: '' });
  }

  pickConversation() {
    fetch('/api/conversations/pick', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ id: this.props.conversationToRender._id }),
    }).then(response => response.json()).then(response => {
      if(response.ok) {
        this.props.conversationToRender.participants.push({ user: { _id: window._injectedData._id } });
        this.setState({
          isInputEnabled: true,
          showPickBtn: false,
          info: 'Conversation has been picked',
        });
      } else {
        this.setState({
          showPickBtn: false,
          info: response.message,
        });
      }
    });
  }

  render() {
    const conversationToRender = this.props.conversationToRender;
    const messages = conversationToRender ? conversationToRender.messages : null;
    return (
      <div
        className={styles.chat}
        role="presentation"
        onClick={e => this.closeEmojiBlock(e)}
      >
        <MessagesList messages={messages} chosenTheme={this.props.chosenTheme} />
        <div style={{ margin: '5px 10px' }}>
          <RaisedButton
            label={'Pick'}
            onClick={this.pickConversation}
            secondary
            style={this.state.showPickBtn ? { display: 'block', width: '100px' } : { display: 'none' }}
          />
          {
            this.state.info
          }
        </div>
        <form className={styles['sending-form']} onSubmit={this.messageSubmit}>
          <RaisedButton
            className={styles['selected-files-counter']}
            label={this.state.filesCounter}
            primary
            ref={(node) => {
              this.filesCounter = node;
            }}
            style={{ height: '39px' }}
          >
            <input
              id="file-input"
              name="fileInput"
              type="file"
              ref={(node) => {
                this.fileInput = node;
              }}
              className={styles['file-input']}
              onChange={this.onFileInputChange}
              multiple
              disabled={!this.state.isInputEnabled}
            />
          </RaisedButton>
          <input
            type="text"
            name="messageInput"
            className={styles['message-input']}
            onChange={(e) => { this.setTextIntoInput(e); }}
            value={this.state.text}
            onBlur={e => this.blurFromInput(e)}
            id="input"
            disabled={!this.state.isInputEnabled}
          />
          <span
            role="button"
            tabIndex="0"
            onClick={e => this.toggleEmojiBlock(e)}
            className={styles['main_emo-menu']}
          >
            <i className={styles['emoji-block-icon']} />
          </span>
          <RaisedButton
            type="submit"
            label="Submit"
            primary
            className={styles['submit-button']}
            style={{ height: '39px' }}
            disabled={!this.state.isInputEnabled}
          />
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
  chosenTheme: propTypes.shape({
    borderRadius: propTypes.number,
    fontFamily: propTypes.string,
    palette: propTypes.object,
    spacing: propTypes.object,
  }),
};

export default Chat;

