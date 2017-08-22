function findConversationById(id, conversations) {

  if (!id || !conversations) return null;
  const conversationItem = conversations.find((conversation) => {
    return conversation._id === id;
  });
  const index = conversations.findIndex((conv) => {
    return conv._id === id;
  });
  return {
    conversationItem,
    index
  };
}

function startSocketConnection(socket) {
  const id = window._injectedData.anonymousId || window._injectedData.userId._id;
  socket.on('user connected', () => {
    console.log('connected to the server succesfully');
  });
  const userObj = {
    type: 'User',
    id
  };
  socket.emit('userId', userObj);
  socket.emit('getUserConversations', id);
  socket.on('userData', (data) => {
    this.setState({ user: data });
  });
  socket.on('returnUserConversations', (conversations) => {
    this.props.setAllConversations(conversations);
  });
  socket.on('newMessage', (message) => {
    this.props.newMessage(message);
  });
  socket.on('newConversationCreated', (conversation) => {
    const newConversations = [...this.props.conversations, conversation];
    this.props.newConversationCreated(newConversations, conversation._id);
  });
  socket.on('forceConversationCreated', (conversation) => {
    const newConversations = [...this.props.conversations, conversation];
    this.props.setForceConvId(conversation._id, newConversations);
  });
}

export {
  findConversationById,
  startSocketConnection
};
