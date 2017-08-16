const UserRepository = require('./../repositories/userRepository');
const ConversationRepository = require('./../repositories/conversationRepository');

function createConversationAndUpdateUser(conversation, userId, socket) {
  ConversationRepository.model.create(conversation).then((conversationData) => {
    const update = { $push: { conversations: conversationData._id } };
    socket.emit('newConversationCreated', conversationData);
    UserRepository.model.findByIdAndUpdate(userId, update).exec();
  });
}

module.exports = createConversationAndUpdateUser;
