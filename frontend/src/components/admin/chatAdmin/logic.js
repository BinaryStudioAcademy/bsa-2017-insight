
import { fetchMessage, getAllConversations } from './../../../actions/conversationsActions';

// function checkUserMessagesReceived(messages) {
//   messages.forEach((message) => {
//     if (message.author.userType === 'User' && message.isReceived === false) {
//       const copy = message;
//       copy.isReceived = true;
//     }
//   });
// }

function startSocketConnection(socket,dispatch, messages, conversationId) {
  const id = window._injectedData._id;
  console.log(socket,'from this socket')
  socket.emit('adminConnectedToRoom', conversationId);
  const userObj = {
    type: 'Admin',
    id
  };
socket.emit('messagesReceived', { type: 'Admin', messages });
  // checkUserMessagesReceived(messages);
  socket.emit('userId', userObj);
  socket.on('newMessage', (message) => {
    if (message.author.userType === 'User') {
      const messageCopy = { ...message };
      messageCopy.isReceived = true;
      socket.emit('newMessageReceived', { type: 'Admin', id: message._id });
      dispatch(fetchMessage(messageCopy));
    

    } else {
      dispatch(fetchMessage(message));
   
    }
  });
  socket.on('unreadNewMessage', (message) => {
    dispatch(fetchMessage(message));
    
  });
}

export {
  startSocketConnection
};

