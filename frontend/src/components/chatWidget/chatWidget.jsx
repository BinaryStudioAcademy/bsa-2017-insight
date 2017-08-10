import React, { Component } from 'react';
import ChatIcon from './chatIcon/chatIcon';
import ChatBody from './chatBody/chatBody';

class ChatWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.onChatIconClick = this.onChatIconClick.bind(this);
    this.onChatClose = this.onChatClose.bind(this);
  }

  onChatClose() {
    this.setState({ isOpen: false });
  }

  onChatIconClick() {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <div>
        {this.state.isOpen ?
          <ChatBody onChatClose={this.onChatClose} /> :
          <ChatIcon onChatIconClick={this.onChatIconClick} />}
      </div>
    );
  }
}

export default ChatWidget;
