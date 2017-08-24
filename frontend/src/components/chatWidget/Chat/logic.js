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

function getForceMessage(conversation) {
  const forceMessage = {
    body: 'what are you want from me ?',
    createdAt: Date.now(),
    forceMessage: true
  };
  if (conversation.length) {
    if (conversation.length === 0) return conversation;
    const oldConversations = [].concat(conversation);
    const { conversationItem, index } = findConversationById(window._injectedData.forceConvId, oldConversations)
    conversationItem.messages = [...conversationItem.messages, forceMessage];
    oldConversations.splice(index, 1, conversationItem);
    return oldConversations;
  } 
  const convCopy = Object.assign({}, conversation);
  convCopy.messages = [forceMessage, ...conversation.messages];
  return convCopy;
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
//  socket.emit('getUserConversations', id);
  socket.on('userData', (data) => {
    this.setState({ user: data });
  });
  socket.on('returnUserConversations', (conversations) => {
    if (window._injectedData.forceConvId && this.props.force) {
      const convWithForceMessage = getForceMessage(conversations);
      this.setState({ conversations: convWithForceMessage, activeChatId: window._injectedData.forceConvId });
    } else {
      this.setState({ conversations });
    }
  });
  socket.on('newMessage', (message) => {
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
    const convWithForceMessage = getForceMessage(conversation);
    const newConversations = [...this.state.conversations, convWithForceMessage];
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
