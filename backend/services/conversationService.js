const UserRepository = require('./../repositories/userRepository');
const ConversationRepository = require('./../repositories/conversationRepository');
const AdminRepository = require('./../repositories/adminRepository');
const mongoose = require('mongoose');

function createConversationAndUpdateUser(conversation, userId, socket) {
  ConversationRepository.model.create(conversation).then((conversationData) => {
    const update = { $push: { conversations: conversationData._id }, $unset: { anonymousCreatedAt: true } };
    socket.emit('newConversationCreated', conversationData);
    socket.room = conversationData._id.toString();
    socket.join(conversationData._id.toString());
    UserRepository.model.findByIdAndUpdate(userId, update).exec();
  });
}

function createForceConversation(conversation, userId, socket) {
  ConversationRepository.model.create(conversation).then((conversationData) => {
    socket.emit('forceConversationCreated', conversationData);
    socket.room = conversationData._id.toString();
    socket.join(conversationData._id.toString());
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
      AdminRepository.model.findOneAndUpdate({ _id: adminId }, { $push: { conversations: conversationId } }).then();
    }
  });
}

module.exports = {
  createConversationAndUpdateUser,
  checkIfAdminIsConversationParticipant,
  createForceConversation,
};
