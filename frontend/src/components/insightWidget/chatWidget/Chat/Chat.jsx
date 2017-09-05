import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';
import ConversationsList from './../ConversationsList/ConversationsList';
import ChatBody from './../ChatBody/ChatBody';
import { findItemById, startSocketConnection } from './logic';
import notifications from '../../../notifications/notifications';
import io from 'socket.io-client/dist/socket.io';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChatId: null,
      conversations: [],
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onConversationClick = this.onConversationClick.bind(this);
    this.onReturnButtonClick = this.onReturnButtonClick.bind(this);
    this.onCreateConversationButtonClick = this.onCreateConversationButtonClick.bind(this);
    this.onForceConversation = this.onForceConversation.bind(this);
  }

  componentDidMount() {
    this.socket = io('http://localhost:3000');
    const id = window._injectedData.anonymousId || window._injectedData.userId._id;
    this.socket.emit('getUserConversations', id);
    startSocketConnection.call(this, this.socket);
  }

  onForceConversation() {
    const userId = window._injectedData.anonymousId || window._injectedData.userId._id;
    const conversation = {
      participants: [{
        userType: 'User',
        user: userId,
      }],
      messages: [],
      open: true,
      createdAt: Date.now(),
    };
    this.socket.emit('createForceConversation', conversation, userId);
  }

  onCreateConversationButtonClick() {
    const userId = window._injectedData.anonymousId || window._injectedData.userId._id;
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
    this.socket.emit('switchRoom', id);
    this.setState({ activeChatId: id });
  }

  onReturnButtonClick() {
    const id = window._injectedData.anonymousId || window._injectedData.userId._id;
    this.props.forceWillBeFalse();
    this.socket.emit('getUserConversations', id);
    this.socket.emit('switchRoom', '');
    this.setState({ activeChatId: null });
  }

  onFormSubmit(event, text) {
    const userId = window._injectedData.anonymousId || window._injectedData.userId._id;
    event.preventDefault();
    const eventCopy = event;
    const message = text;
    const files = [...event.target.fileInput.files];
    if (files.length === 0) {
      if (message === '') return;
      const messageObj = {
        conversationId: this.state.activeChatId,
        body: message,
        createdAt: Date.now(),
        author: {
          item: userId,
          userType: 'User',
        },
        isReceived: false,
      };
      this.socket.emit('newMessage', messageObj);
      if (window._injectedData
        && window._injectedData.userId
        && typeof (window._injectedData.userId === 'object')) {
        notifications.email(messageObj);
      }
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
              conversationId: this.state.activeChatId,
              body: objectToSend,
              createdAt: Date.now(),
              author: {
                item: userId,
                userType: 'User',
              },
              isReceived: false,
            };
            this.socket.emit('newMessage', messageObj);
          });
      });
      eventCopy.target.reset();
      eventCopy.target.querySelector('span').innerHTML = '';
    }
  }

  render() {
    const conversations = this.state.conversations;
    const conversationToRender = conversations.length > 0 ? findItemById(this.state.activeChatId, conversations) : null;
    const messages = conversationToRender ? conversationToRender.item.messages : null;
    const operator = conversationToRender ?
      conversationToRender.item.participants.find(participant => participant.userType === 'Admin') :
      null;
    const chatStyles = this.props.widgetStyles.widgetPosition === 'right' ?
      {
        right: '25px',
        bottom: '25px',
      } :
      {
        left: '25px',
        bottom: '25px',
      };
    return (
      <div className={styles.chat} style={chatStyles}>
        {!this.state.activeChatId && <ConversationsList
          widgetStyles={this.props.widgetStyles}
          conversations={conversations}
          onConversationClick={this.onConversationClick}
          onCreateConversationButtonClick={this.onCreateConversationButtonClick}
          onChatClose={this.props.onChatClose}
        />}
        {this.state.activeChatId &&
        <ChatBody
          socket={this.socket}
          widgetStyles={this.props.widgetStyles}
          operator={operator}
          messages={messages}
          onFormSubmit={this.onFormSubmit}
          onReturnButtonClick={this.onReturnButtonClick}
        />}
      </div>
    );
  }
}

Chat.propTypes = {
  onChatClose: propTypes.func.isRequired,
  widgetStyles: propTypes.shape({
    backgroundImage: propTypes.string,
    primaryColor: propTypes.string,
    widgetPosition: propTypes.string,
  }),
  forceWillBeFalse: propTypes.func,
};

export default Chat;
