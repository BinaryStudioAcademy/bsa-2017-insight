const UserRepository = require('./../repositories/userRepository');
const ConversationRepository = require('./../repositories/conversationRepository');
const mongoose = require('mongoose');

function createConversationAndUpdateUser(conversation, userId, socket) {
  ConversationRepository.model.create(conversation).then((conversationData) => {
    const update = { $push: { conversations: conversationData._id } };
    socket.emit('newConversationCreated', conversationData);
    UserRepository.model.findByIdAndUpdate(userId, update).exec();
  });
}

function createForceConversation(conversation, userId, socket) {
  ConversationRepository.model.create(conversation).then((conversationData) => {
    socket.emit('forceConversationCreated', conversationData);
    const update = { $push: { conversations: conversationData._id } };
    UserRepository.model.findByIdAndUpdate(userId, update).exec();
  });
}

function checkIfAdminIsConversationParticipant(conversationId, adminId) {
  ConversationRepository.model.findById(conversationId).then((conversationData) => {
    const isAdminParticipant = conversationData._doc.participants.find((participant) => {
      return participant.user.toString() === adminId;
    });
    const adminIdObject = {
      userType: 'Admin',
      user: mongoose.Types.ObjectId(adminId),
    };
    if (!isAdminParticipant) {
      ConversationRepository.model.findOneAndUpdate({ _id: conversationId }, { $push: { participants: adminIdObject } })
        .then();
    }
  });
}

module.exports = {
  createConversationAndUpdateUser,
  checkIfAdminIsConversationParticipant,
  createForceConversation
};
