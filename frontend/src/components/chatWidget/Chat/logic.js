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

export default findConversationById;
