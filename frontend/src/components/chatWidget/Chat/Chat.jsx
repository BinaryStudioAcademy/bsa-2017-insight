import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';
import io from './../../../../../node_modules/socket.io-client/dist/socket.io';
import ConversationsList from './../ConversationsList/ConversationsList';
import ChatBody from './../ChatBody/ChatBody';
import findConversationById from './logic';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChatId: null,
    };
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.onConversationClick = this.onConversationClick.bind(this);
  }

  componentDidMount() {
    //  const id = window._injectedData.globalId || window._injectedData.userId._id;
    this.socket = io('http://localhost:3000');
    this.socket.on('user connected', () => {
      console.log('connected to the server succesfully');
    });
    const userObj = {
      type: 'User',
      id: '598ef12257350736943d3c44',
    };
    this.socket.emit('userId', userObj);
    this.socket.on('userData', (data) => {
      // и тут мы должны как-то знать айдишник разговора, который нам нужно отрендерить, и передать запрос дальше
      console.log(data);
      console.log(this);
      this.setState({ user: data });
    });
    this.socket.on('newMessage', (message) => {
      this.setState((prevState) => {
        const conversation = findConversationById(message.conversationId, prevState.user.conversations);
        console.log(conversation);
        prevState.user.conversations.splice(conversation.index, 1);
        conversation.item.messages = [...conversation.item.messages, message];
        const newConversations = [...prevState.user.conversations, conversation.item];
        console.log(newConversations);
        const newUser = Object.assign({}, prevState.user, { conversations: newConversations });
        console.log(newUser);
        return {
          user: newUser,
        };
      });
    });
  }

  onConversationClick(id) {
    this.setState({ activeChatId: id });
  }

  handleMessageSubmit(event) {
    event.preventDefault();
    const eventCopy = event;
    const message = event.target.messageInput.value;
    const messageObj = {
      conversationId: this.state.user.conversations[0],
      body: message,
      createdAt: Date.now(),
      author: {
        item: '598ef12257350736943d3c44',
        userType: 'User',
      },
    };
    this.socket.emit('newMessage', messageObj);
    eventCopy.target.messageInput.value = '';
  }


  render() {
    const conversations = this.state.user && this.state.user.conversations;
    const conversationToRender = findConversationById(this.state.activeChatId, conversations);
    const messages = conversationToRender ? conversationToRender.item.messages : null;
    return (
      <div className={styles.chat}>
        <div className={styles['close-button']} onClick={this.props.onChatClose} role="button" tabIndex="0" />
        {!this.state.activeChatId && <ConversationsList
          conversations={conversations}
          onConversationClick={this.onConversationClick}
        />}
        {this.state.activeChatId && <ChatBody messages={messages} onMessageSubmit={this.handleMessageSubmit} />}
      </div>
    );
  }
}

Chat.propTypes = {
  onChatClose: propTypes.func.isRequired,
};

export default Chat;
