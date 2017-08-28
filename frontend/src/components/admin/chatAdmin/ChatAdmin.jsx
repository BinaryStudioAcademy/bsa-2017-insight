import React, { Component } from 'react';
import propTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
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
      filesCounter: 'Select file',
    };
    this.onFileInputChange = this.onFileInputChange.bind(this);
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

  onFileInputChange() {
    if (this.fileInput.files.length === 1) {
      this.setState({ filesCounter: this.fileInput.files[0].name });
    } else if (this.fileInput.files.length > 1) {
      this.setState({ filesCounter: `Selected files: ${this.fileInput.files.length}` });
    } else {
      this.setState({ filesCounter: 'Select file' });
    }
  }

  handleMessageSubmit(event) {
    event.preventDefault();
    const eventCopy = event;
    const message = event.target.messageInput.value;
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
      this.socket.emit('newMessage', messageObj);
      eventCopy.target.messageInput.value = '';
      notifications.email(messageObj);
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
            this.socket.emit('newMessage', messageObj);
          });
      });
      eventCopy.target.reset();
      this.setState({ filesCounter: 'Select file' });
    }
  }

  render() {
    const conversationToRender = this.props.conversationToRender;
    const messages = conversationToRender ? conversationToRender.messages : null;
    return (
      <div className={styles.chat}>
        <MessagesList messages={messages} />
        <form className={styles['sending-form']} onSubmit={this.handleMessageSubmit}>
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
            />
          </RaisedButton>
          <input
            type="text"
            name="messageInput"
            className={styles['message-input']}
            placeholder="Type yor message here.."
          />
          <RaisedButton
            type="submit"
            label="Submit"
            primary
            className={styles['submit-button']}
            style={{ height: '39px' }}
          />
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

