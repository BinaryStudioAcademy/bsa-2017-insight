import React from 'react';
import ChatIcon from './ChatIcon/chatIcon';
import ChatBody from './Chat/Chat';
import Trigger from './Trigger';

const ChatWidget = (props) => {
  console.log(props.phrase)
  return (
    <div>
      {props.isOpen ?
        <ChatBody onChatClose={props.toggleChat} phrase={props.phrase} /> :
        <ChatIcon onChatIconClick={props.toggleChat} />}
    </div>
  );
}

export default Trigger(ChatWidget);
