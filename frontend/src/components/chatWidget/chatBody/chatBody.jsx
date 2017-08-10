import React, { Component } from 'react';
import propTypes from 'prop-types';
import MessagesList from './../messagesList/messagesList';
import styles from './styles.scss';
import io from './../../../../../node_modules/socket.io-client/dist/socket.io';

class ChatWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  // если у юзера может быть одновременно много чатов - проблема, нужно придумать как хранить айди разговора на клиенте
  componentDidMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('user connected', () => {
      console.log('connected to the server succesfully');
    });
    this.socket.emit('userId', '981f9fa9f79298288a32fc3b');
    this.socket.on('userData', (data) => {
      // и тут мы должны как-то знать айдишник разговора, который нам нужно отрендерить, и передать запрос дальше
      console.log(data);
      console.log(this);
      this.setState({ user: data });
      this.socket.emit('getConversation', data.conversations[0]);
    });
    this.socket.on('returnConversation', (data) => {
      console.log(data);
      console.log(this);
      this.setState({
        conversation: data,
        messages: data.messages,
      });
    });
    this.socket.on('newMessage', (message) => {
      this.setState((prevState) => {
        const messages = [...prevState.messages, message];
        const conversation = Object.assign({}, prevState.conversation, { messages });
        return {
          conversation,
          messages,
        };
      });
    });
  }

  handleMessageSubmit(event) {
    event.preventDefault();
    const message = event.target.messageInput.value;
    const messageObj = {
      conversationId: '598ca1205325133404edb50a',
      body: message,
      createdAt: Date.now(),
      author: {
        item: '981f9fa9f79298288a32fc3b',
        userType: 'Visitor',
      },
    };
    this.socket.emit('newMessage', messageObj);
    event.target.messageInput.value = '';
  }

  render() {
    return (
      <div className={styles.chat}>
        <div className={styles.closeButton} onClick={this.props.onChatClose} role="button" tabIndex="0" />
        <MessagesList messages={this.state.messages} />
        <form className={styles.sendingForm} onSubmit={this.handleMessageSubmit}>
          <input
            type="text"
            name="messageInput"
            className={styles.messageInput}
            placeholder="Type yor message here.."
          />
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
