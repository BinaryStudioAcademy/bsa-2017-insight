import io from './../../../../node_modules/socket.io-client/dist/socket.io';
import { fetchMessage, getAllConversations } from './../../actions/conversationsActions';
import { getStatisticById } from './../../actions/statisticActions';

function startSocketConnection(dispatch) {
  const id = window._injectedData._id;
  this.socket = io('http://localhost:3000/');
  const userObj = {
    type: 'Admin',
    id,
  };
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
  this.socket.on('newMessageToRespond', () => {
    this.props.getAllConversations();
  });
}

export default startSocketConnection;

