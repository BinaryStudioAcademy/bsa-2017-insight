import io from './../../../../node_modules/socket.io-client/dist/socket.io';

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

function startSocketConnection() {
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
    this.setState({ admin: data });
  });
  this.socket.on('newMessage', (message) => {
    this.setState((prevState) => {
      const conversation = findConversationById(message.conversationId, prevState.admin.conversations);
      console.log(conversation);
      prevState.admin.conversations.splice(conversation.index, 1);
      conversation.item.messages = [...conversation.item.messages, message];
      const newConversations = [...prevState.admin.conversations, conversation.item];
      console.log(newConversations);
      const newUser = Object.assign({}, prevState.admin, { conversations: newConversations });
      console.log(newUser);
      return {
        admin: newUser,
      };
    });
  });
}

export {
  findConversationById,
  startSocketConnection,
};
