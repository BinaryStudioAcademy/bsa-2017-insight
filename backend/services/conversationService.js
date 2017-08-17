const UserRepository = require('./../repositories/userRepository');
const ConversationRepository = require('./../repositories/conversationRepository');

function createConversationAndUpdateUser(conversation, userId, socket) {
  ConversationRepository.model.create(conversation).then((conversationData) => {
    const update = { $push: { conversations: conversationData._id } };
    socket.emit('newConversationCreated', conversationData);
    UserRepository.model.findByIdAndUpdate(userId, update).exec();
  });
}

function checkIfAdminIsConversationParticipant(conversationId, adminId) {
  ConversationRepository.model.findById(conversationId).then((conversationData) => {
    const isAdminParticipant = conversationData.participants.find(participantId => participantId === adminId);
    if (!isAdminParticipant) {
      ConversationRepository.model.findByIdAndUpdate(conversationId, { $push: { participants: adminId } }).exec();
    }
  });
}

module.exports = {
  createConversationAndUpdateUser,
  checkIfAdminIsConversationParticipant,
};
