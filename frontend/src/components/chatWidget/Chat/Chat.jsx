import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';
import io from './../../../../../node_modules/socket.io-client/dist/socket.io';
import ConversationsList from './../ConversationsList/ConversationsList';
import ChatBody from './../ChatBody/ChatBody';
import { findConversationById, startSocketConnection } from './logic';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChatId: null,
    };
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
    this.onConversationClick = this.onConversationClick.bind(this);
    this.onReturnButtonClick = this.onReturnButtonClick.bind(this);
    this.onCreateConversationButtonClick = this.onCreateConversationButtonClick.bind(this);
  }

  componentDidMount() {
    //  const id = window._injectedData.globalId || window._injectedData.userId._id;
    this.socket = io('http://localhost:3000');
    startSocketConnection.call(this, this.socket);
    // запрос на разговры делать с популейтом партисипентов
    // TODO разделить юзера и список разговоров
    // TODO создать кнопку открытия нового чата, по клику создавать разговор с уже включенным участником
    // (текущим юзером) и отдельно в объект юзера добавлять новый разговор
  }

  onCreateConversationButtonClick() {
    const userId = '598ef12257350736943d3c44'; // window._injectedData.globalId || window._injectedData.userId._id;
    const conversation = {
      participants: [{
        userType: 'User',
        user: userId,
      }],
      messages: [],
      open: true,
      createdAt: Date.now(),
    };
    this.socket.emit('createNewConversation', conversation, userId);
  }
  onConversationClick(id) {
    this.setState({ activeChatId: id });
  }
  onReturnButtonClick() {
    this.setState({ activeChatId: null });
  }
  onMessageSubmit(event) {
    event.preventDefault();
    const eventCopy = event;
    const message = event.target.messageInput.value;
    const messageObj = {
      conversationId: this.state.activeChatId, // должно быть activeChatId
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

  // разговор отображать в виде "Разговор с "список участников не типа User""
  render() {
    const conversations = this.state.conversations;
    const conversationToRender = findConversationById(this.state.activeChatId, conversations);
    const messages = conversationToRender ? conversationToRender.conversationItem.messages : null;
    return (
      <div className={styles.chat}>
        <div className={styles['close-button']} onClick={this.props.onChatClose} role="button" tabIndex="0" />
        {!this.state.activeChatId && <ConversationsList
          conversations={conversations}
          onConversationClick={this.onConversationClick}
          onCreateConversationButtonClick={this.onCreateConversationButtonClick}
        />}
        {this.state.activeChatId &&
        <ChatBody
          messages={messages}
          onMessageSubmit={this.onMessageSubmit}
          onReturnButtonClick={this.onReturnButtonClick}
        />}
      </div>
    );
  }
}

Chat.propTypes = {
  onChatClose: propTypes.func.isRequired,
};

export default Chat;
