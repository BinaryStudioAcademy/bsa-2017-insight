import React, { Component } from 'react';

import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { setForceConvId, setAllConversations, newConversationCreated, setActiveChat, removeActiveChat, newMessage } from '../../../actions/chatWidgetActions';

import styles from './styles.scss';
import io from './../../../../../node_modules/socket.io-client/dist/socket.io';
import ConversationsList from './../ConversationsList/ConversationsList';
import ChatBody from './../ChatBody/ChatBody';
import { findConversationById, startSocketConnection } from './logic';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChatToRender: null,
      conversations: [],
      showChat: null,
      forced: null
    };
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
    this.onConversationClick = this.onConversationClick.bind(this);
    this.onReturnButtonClick = this.onReturnButtonClick.bind(this);
    this.onCreateConversationButtonClick = this.onCreateConversationButtonClick.bind(this);
    this.onForceConversation = this.onForceConversation.bind(this);
  }

  componentDidMount() {
    this.socket = io('http://localhost:3000');
    startSocketConnection.call(this, this.socket);
    if (this.props.force && !this.props.forceConvId) {
      this.onForceConversation();
    } else if (this.props.force && this.props.forceConvId) {
      this.props.setActiveChat(this.props.forceConvId);
    }
  }


  onForceConversation() {
    const userId = window._injectedData.anonymousId || window._injectedData.userId._id;
    const conversation = {
      participants: [{
        userType: 'User',
        user: userId
      }],
      messages: [],
      open: true,
      createdAt: Date.now()
    };
    this.socket.emit('createForceConversation', conversation, userId);
  } 

  onCreateConversationButtonClick() {
    const userId = window._injectedData.anonymousId || window._injectedData.userId._id;
    const conversation = {
      participants: [{
        userType: 'User',
        user: userId
      }],
      messages: [],
      open: true,
      createdAt: Date.now()
    };
    this.socket.emit('createNewConversation', conversation, userId);
  }

  onConversationClick(id) {
    this.props.setActiveChat(id);
  }

  onReturnButtonClick() {
    this.props.removeActiveChat();
  }

  onMessageSubmit(event) {
    event.preventDefault();
    const eventCopy = event;
    const message = event.target.messageInput.value;
    const messageObj = {
      conversationId: this.props.activeChatId || this.props.forceConvId, // должно быть activeChatId
      body: message,
      createdAt: Date.now(),
      author: {
        item: this.state.user._id,
        userType: 'User'
      }
    };
    console.log('ON MESSAGE SUBMIT')
    this.socket.emit('newMessage', messageObj);
    eventCopy.target.messageInput.value = '';
  }

  render() {
    const conversations = this.props.conversations;
    const chatId = this.props.activeChatId;
    const conversationToRender = findConversationById(chatId, conversations);
    const messages = conversationToRender ? conversationToRender.conversationItem.messages : null;
    return (
      <div className={styles.chat}>
        <img
          alt="close-button"
          src="https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-part-2/512/erase_delete_remove_wipe_out-512.png"
          className={styles['close-button']}
          onClick={this.props.onChatClose}
          role="button"
          tabIndex="0"
        />
        {!this.props.activeChatId && <ConversationsList
          conversations={conversations}
          onConversationClick={this.onConversationClick}
          onCreateConversationButtonClick={this.onCreateConversationButtonClick}
        />}
        {this.props.activeChatId &&
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
  force: propTypes.bool,
  forceConvId: propTypes.string,
  setActiveChat: propTypes.func,
  removeActiveChat: propTypes.func,
  activeChatId: propTypes.string,
  conversations: propTypes.arrayOf(propTypes.shape({
    _id: propTypes.string.isRequired,
    participants: propTypes.arrayOf(propTypes.shape({
      userType: propTypes.string,
      user: propTypes.any
    })).isRequired,
    messages: propTypes.arrayOf(propTypes.any).isRequired,
    open: propTypes.bool,
    createdAt: propTypes.oneOfType([propTypes.number, propTypes.string])
  }))

};

const mapStateToProps = (state) => {
  return {
    forceConvId: state.chatWidgetInfo.forceConvId,
    conversations: state.chatWidgetInfo.conversations,
    activeChatId: state.chatWidgetInfo.activeChatId
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setForceConvId: (id, newConversations) => {
      dispatch(setForceConvId(id, newConversations));
    },
    setAllConversations: (conversations) => {
      dispatch(setAllConversations(conversations));
    },
    newConversationCreated: (conversations, activeChatId) => {
      dispatch(newConversationCreated(conversations, activeChatId));
    },
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    removeActiveChat: () => {
      dispatch(removeActiveChat());
    },
    newMessage: (message) => {
      dispatch(newMessage(message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
