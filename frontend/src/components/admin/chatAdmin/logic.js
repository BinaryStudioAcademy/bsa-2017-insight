import io from './../../../../../node_modules/socket.io-client/dist/socket.io';
import { fetchMessage } from './../../../actions/conversationsActions';

// function checkUserMessagesReceived(messages) {
//   messages.forEach((message) => {
//     if (message.author.userType === 'User' && message.isReceived === false) {
//       const copy = message;
//       copy.isReceived = true;
//     }
//   });
// }

function startSocketConnection(dispatch, messages, user) {
  const id = window._injectedData._id;
  this.socket = io('http://localhost:3000');
  const userObj = {
    type: 'Admin',
    id,
  };
  this.socket.emit('messagesReceived', { type: 'Admin', messages });
  // checkUserMessagesReceived(messages);
  this.socket.emit('userId', userObj);
  this.socket.on('newMessage', (message) => {
    if (message.author.userType === 'User' && message.author.item._id === user.user._id) {
      const messageCopy = { ...message };
      messageCopy.isReceived = true;
      this.socket.emit('newMessageReceived', { type: 'Admin', id: message._id });
      dispatch(fetchMessage(messageCopy));
    } else {
      dispatch(fetchMessage(message));
    }
  });
}

export {
  startSocketConnection,
};

