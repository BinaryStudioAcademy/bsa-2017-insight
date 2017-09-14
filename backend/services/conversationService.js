const UserRepository = require('./../repositories/userRepository');
const ConversationRepository = require('./../repositories/conversationRepository');
const AdminRepository = require('./../repositories/adminRepository');
const mongoose = require('mongoose');
const async = require('async');

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

function pickConversation(conversationId, adminId, callback) {
  async.waterfall([
    (done) => {
      ConversationRepository.getById(conversationId, (err, conversation) => {
        if(err) {
          return done(err);
        }
        if(conversation.participants.length > 1) {
          return done(new Error('Conversation is already picked'));
        }
        done();
      });
    },
    (done) => {
      ConversationRepository.update(conversationId, { $push: { participants: {
        userType: 'Admin',
        user: mongoose.Types.ObjectId(adminId),
      }}}, (err, result) => {
        if(err) {
          return done(err);
        }
        done();
      });
    },
    (done) => {
      AdminRepository.update(adminId, { $push: { conversations: conversationId } }, (err, result) => {
        if(err) {
          return done(err);
        }
        done();
      });
    }
  ], (err, data) => {
    callback(err, data);
  });
}

function reassignConversation(conversationId, currentUserId, newUser, callback) {
  let updatedConversation;
  async.series([
    (done) => {
      conversation: ConversationRepository.model.findOne({ 
        _id: conversationId, 
        'participants.user': newUser.user 
      }, (err, data) => {
        if(err) return done(err);
        if(data) return done(new Error('User is already assigned'));
        done();
      });
    },
    (done) => {
      ConversationRepository.model.findOneAndUpdate({ 
        _id: conversationId,
        'participants.user': currentUserId 
      },
      { 
        $set: { 'participants.$': newUser, isReassigned: true }
      }, {new: true}, (err, conversation) => {
          if(err) return done(err);
          updatedConversation = conversation;
          done();
      });
    },
    (done) => {
      AdminRepository.model.update({
        _id: currentUserId,
      },
      {
        $pull: { conversations: conversationId },
      },(err, data) => {
        if(err) return done(err);
        done();
      });
    },
    (done) => {
      AdminRepository.model.update({
        _id: newUser.user,
      },
      {
        $push: { conversations: conversationId, reassignedConversations: conversationId }
      },(err, data) => {
        if(err) return done(err);
        done(null);
      });
    }
  ], (err, result) => {
      callback(err, { ok: true, message: 'Conversation was reassigned', newParticipant: newUser.user, userId: updatedConversation.participants[0].user });
  });
};

module.exports = {
  createConversationAndUpdateUser,
  checkIfAdminIsConversationParticipant,
  createForceConversation,
  pickConversation,
  reassignConversation,
};
