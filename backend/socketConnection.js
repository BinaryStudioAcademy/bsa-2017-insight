const MessageRepository = require('./repositories/messageRepository');
const ConversationRepository = require('./repositories/conversationRepository');
const UserRepository = require('./repositories/userRepository');
const AdminRepository = require('./repositories/adminRepository');
const createConversationAndUpdateUser = require('./services/conversationService').createConversationAndUpdateUser;
const createForceConversation = require('./services/conversationService').createForceConversation;
const checkIfAdminIsConversationParticipant = require('./services/conversationService').checkIfAdminIsConversationParticipant;
const mongoose = require('mongoose');

function connectionHandler(socket) {
  let user;
  socket.emit('user connected');
  socket.on('userId', (userObj) => {
    if (userObj.type === 'User') {
      UserRepository.model.findOne({ _id: userObj.id })
        .then((data) => {
          user = data;
          socket.emit('userData', data);
        });
    }
    if (userObj.type === 'Admin') {
      AdminRepository.model.findOne({ _id: userObj.id })
        .then((data) => {
          user = data;
          socket.emit('adminData', data);
        });
    }
  });
  socket.on('getUserConversations', (id) => {
    const objectId = mongoose.Types.ObjectId(id);
    ConversationRepository.getConversationsByUserId(objectId).then((data) => {
      socket.emit('returnUserConversations', data);
    });
  });
  socket.on('newMessage', (message) => {
    MessageRepository.model.create(message)
      .then((data) => {
        console.log('message added succesfully');
        const messageToSend = data;
        if (message.author.userType === 'Admin') {
          checkIfAdminIsConversationParticipant(message.conversationId, message.author.item);
        }
        if (messageToSend.author.item.toString() === user._id.toString()) {
          messageToSend._doc.author.item = user;
        }
        const id = data._id;
        socket.emit('newMessage', messageToSend);
        socket.broadcast.emit('newMessage', messageToSend);
        ConversationRepository.model
          .findOneAndUpdate({ _id: message.conversationId }, { $push: { messages: mongoose.Types.ObjectId(id) } })
          .then();
      });
  });
  socket.on('createNewConversation', (conversationData, creatorId) => {
    createConversationAndUpdateUser(conversationData, creatorId, socket);
  });
  socket.on('createForceConversation', (conversationData, creatorId) => {
    console.log(conversationData, creatorId,'+++++++++++++++++++++')
    createForceConversation(conversationData, creatorId, socket);
  });
}

module.exports = connectionHandler;
