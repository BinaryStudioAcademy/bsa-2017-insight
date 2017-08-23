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
    console.log(conversations,'from socket')
    if (window._injectedData.forceConvId) {
      this.setState({ conversations, activeChatId: window._injectedData.forceConvId });
    } else {
      this.setState({ conversations });
    }

  });
  socket.on('newMessage', (message) => {
    console.log("new message")
    this.setState((prevState) => {
      const { conversationItem, index } = findConversationById(message.conversationId, prevState.conversations);
      if (index === -1) return { conversations: [...prevState.conversations] };
      const oldConversations = [...prevState.conversations];
      oldConversations.splice(index, 1);
      conversationItem.messages = [...conversationItem.messages, message];
      const newConversations = [...oldConversations, conversationItem];
      return {
        conversations: newConversations
      };
    });
  });
  socket.on('newConversationCreated', (conversation) => {
    const newConversations = [...this.state.conversations, conversation];
    this.setState({
      conversations: newConversations,
      activeChatId: conversation._id
    });
  });
  socket.on('forceConversationCreated', (conversation) => {
    const convCopy = Object.assign({}, conversation);
    const forceMessage = {
      body: 'AHAHAHAHAH',
      createdAt: Date.now()
    }
    convCopy.messages = [...conversation.messages, forceMessage]
    const newConversations = [...this.state.conversations, convCopy];
    console.log(newConversations,'newConversations')
    window._injectedData.forceConvId = conversation._id;
    this.setState({
      conversations: newConversations,
      activeChatId: conversation._id
    });
  });
}

export {
  findConversationById,
  startSocketConnection
};
