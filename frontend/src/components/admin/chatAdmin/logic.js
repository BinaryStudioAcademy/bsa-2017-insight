import io from './../../../../../node_modules/socket.io-client/dist/socket.io';
import { fetchMessage, getAllConversations } from './../../../actions/conversationsActions';
import { getStatisticById } from './../../../actions/statisticActions';

// function checkUserMessagesReceived(messages) {
//   messages.forEach((message) => {
//     if (message.author.userType === 'User' && message.isReceived === false) {
//       const copy = message;
//       copy.isReceived = true;
//     }
//   });
// }

function startSocketConnection(dispatch, messages, conversationId) {
  const id = window._injectedData._id;
  this.socket = io('http://localhost:3000');
  this.socket.emit('adminConnectedToRoom', conversationId);
  const userObj = {
    type: 'Admin',
    id,
  };
  this.socket.emit('messagesReceived', { type: 'Admin', messages });
  // checkUserMessagesReceived(messages);
  this.socket.emit('userId', userObj);
  this.socket.on('newMessage', (message) => {
    if (message.author.userType === 'User') {
      const messageCopy = { ...message };
      messageCopy.isReceived = true;
      this.socket.emit('newMessageReceived', { type: 'Admin', id: message._id });
      dispatch(fetchMessage(messageCopy));
    } else {
      dispatch(fetchMessage(message));
    }
  });
  this.socket.on('unreadNewMessage', (message) => {
    dispatch(fetchMessage(message));
  });
  this.socket.on('introduced', (data) => {
    dispatch(getAllConversations());
    dispatch(getStatisticById(data.id));
  });
}

export {
  startSocketConnection,
};

