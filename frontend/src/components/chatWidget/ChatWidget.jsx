import React from 'react';
import propTypes from 'prop-types';
import ChatIcon from './ChatIcon/chatIcon';
import Chat from './Chat/Chat';
import Trigger from './Trigger';

const ChatWidget = (props) => {
  return (
    <div>
      {props.isOpen ?
        <Chat onChatClose={props.toggleChat} force={props.force} /> :
        <ChatIcon onChatIconClick={props.toggleChat} />}
    </div>
  );
};

ChatWidget.propTypes = {
  isOpen: propTypes.bool,
  toggleChat: propTypes.func,
  force: propTypes.bool
};


export default Trigger(ChatWidget);
