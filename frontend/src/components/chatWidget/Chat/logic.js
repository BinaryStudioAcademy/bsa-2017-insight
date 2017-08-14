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
    index,
  };
}

function startSocketConnection(socket) {
  socket.on('user connected', () => {
    console.log('connected to the server succesfully');
  });
  const userObj = {
    type: 'User',
    id: '598ef12257350736943d3c44',
  };
  socket.emit('userId', userObj);
  socket.emit('getUserConversations', '598ef12257350736943d3c44');
  socket.on('userData', (data) => {
    console.log('User:', data);
    this.setState({ user: data });
  });
  socket.on('returnUserConversations', (conversations) => {
    console.log('conversations:', conversations);
    this.setState({ conversations });
  });
  socket.on('newMessage', (message) => {
    this.setState((prevState) => {
      const { conversationItem, index } = findConversationById(message.conversationId, prevState.conversations);
      const oldConversations = [...prevState.conversations];
      oldConversations.splice(index, 1);
      conversationItem.messages = [...conversationItem.messages, message];
      const newConversations = [...oldConversations, conversationItem];
      return {
        conversations: newConversations,
      };
    });
  });
}

export {
  findConversationById,
  startSocketConnection,
};
