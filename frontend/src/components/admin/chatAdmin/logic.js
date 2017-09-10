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

function startSocketConnection(socket, dispatch, messages, conversationId) {
  const id = window._injectedData._id;
  socket.emit('adminConnectedToRoom', conversationId);
  const userObj = {
    type: 'Admin',
    id,
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
  socket.on('introduced', (data) => {
    dispatch(getAllConversations());
    dispatch(getStatisticById(data.id));
  });
}

export {
  startSocketConnection,
};

