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

function startSocketConnection(dispatch, messages) {
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
    dispatch(fetchMessage(message));
  });
}

export {
  startSocketConnection,
};

