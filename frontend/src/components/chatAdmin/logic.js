import io from './../../../../node_modules/socket.io-client/dist/socket.io';
import { fetchUser, fetchMessage } from './../../actions/usersActions';

function findConversationById(id, conversations) {
  if (!id || !conversations) return null;
  const item = conversations.find((conversation) => {
    return conversation._id === id;
  });
  const index = conversations.findIndex((conv) => {
    return conv._id === id;
  });
  return {
    item,
    index,
  };
}

function startSocketConnection(dispatch) {
  this.socket = io('http://localhost:3000');
  this.socket.on('user connected', () => {
    console.log('connected to the server succesfully');
  });
  const userObj = {
    type: 'Admin',
    id: '598ef17257350736943d3c45',
  };
  this.socket.emit('userId', userObj);
  this.socket.on('adminData', (data) => {
    // и тут мы должны как-то знать айдишник разговора, который нам нужно отрендерить, и передать запрос дальше
    console.log(data);
    console.log(this);
    dispatch(fetchUser(data));
  });
  this.socket.on('newMessage', (message) => {
    dispatch(fetchMessage(message));
  });
}

export {
  startSocketConnection,
  findConversationById,
};
