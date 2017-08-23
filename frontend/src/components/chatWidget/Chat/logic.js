function findItemById(id, arrOfObjects) {
  if (!id || !arrOfObjects) return null;
  const item = arrOfObjects.find((obj) => {
    return obj._id === id;
  });
  const index = arrOfObjects.findIndex((obj) => {
    return obj._id === id;
  });
  return {
    item,
    index,
  };
}

function startSocketConnection(socket) {
  const id = window._injectedData.anonymousId || window._injectedData.userId._id;
  socket.on('user connected', () => {
    console.log('connected to the server succesfully');
  });
  const userObj = {
    type: 'User',
    id,
  };
  socket.emit('userId', userObj);
  socket.emit('getUserConversations', id);
  socket.on('userData', (data) => {
    this.setState({ user: data });
  });
  socket.on('returnUserConversations', (conversations) => {
    this.setState({ conversations });
  });
  socket.on('newMessage', (message) => {
    this.setState((prevState) => {
      const { item: conversationItem, index } = findItemById(message.conversationId, prevState.conversations);
      const oldConversations = [...prevState.conversations];
      oldConversations.splice(index, 1);
      conversationItem.messages = [...conversationItem.messages, message];
      const newConversations = [...oldConversations, conversationItem];
      return {
        conversations: newConversations,
      };
    });
  });
  socket.on('newConversationCreated', (conversation) => {
    const newConversations = [...this.state.conversations, conversation];
    this.setState({
      conversations: newConversations,
      activeChatId: conversation._id,
    });
  });
  socket.on('messagesReceived', (updatedMessages) => {
    this.setState((prevState) => {
      const { item: conversationItem,
        index } = findItemById(updatedMessages[0].conversationId, prevState.conversations);
      const oldConversations = [...prevState.conversations];
      oldConversations.splice(index, 1);
      conversationItem.messages = [...updatedMessages];
      const newConversations = [...oldConversations, conversationItem];
      return {
        conversations: newConversations,
      };
    });
  });
  socket.on('newMessageReceived', (message) => {
    this.setState((prevState) => {
      const { item: conversationItem,
        index: conversationIndex } = findItemById(message.conversationId, prevState.conversations);
      const { index: messageIndex } = findItemById(message._id, conversationItem.messages);
      const oldMessages = [...conversationItem.messages];
      oldMessages.splice(messageIndex, 1);
      const newMessages = [...oldMessages, message];
      const newConversation = { ...conversationItem, messages: newMessages };
      const oldConversations = [...prevState.conversations];
      oldConversations.splice(conversationIndex, 1);
      const newConversations = [...oldConversations, newConversation];
      return {
        conversations: newConversations,
      };
    });
  });
}

export {
  findItemById,
  startSocketConnection,
};
