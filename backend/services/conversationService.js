const UserRepository = require('./../repositories/userRepository');
const ConversationRepository = require('./../repositories/conversationRepository');
const MessageRepository = require('./../repositories/messageRepository');
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
    // MessageRepository.model.create(forceMessage)
    //   .then((data) => {
    //     console.log(data,'000000000000000000000')
    //     const id = data._id;
    //     ConversationRepository.model
    //       .findByIdAndUpdate({ _id: conversationData._id }, { $push: { messages: mongoose.Types.ObjectId(id) } })
    //       .then(() => {
    //         ConversationRepository.model.findById({_id:conversationData._id })
    //         .populate('messages').exec((err,conv)=>{
    //           console.log(conv,'___________________________________')
    //           socket.emit('forceConversationCreated', conv);
    //           const update = { $push: { conversations: conversationData._id } };
    //           UserRepository.model.findByIdAndUpdate(userId, update).exec();
    //         });
              
        
          
    //     })
      
    //   })
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
