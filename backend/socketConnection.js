const MessageRepository = require('./repositories/messageRepository');
const ConversationRepository = require('./repositories/conversationRepository');
const UserRepository = require('./repositories/userRepository');
const AdminRepository = require('./repositories/adminRepository');
const mongoose = require('mongoose');

function connectionHandler(socket) {
  socket.emit('user connected');
  socket.on('userId', (userObj) => {
    if (userObj.type === 'User') {
      UserRepository.model.findOne({ _id: userObj.id })
        .then((data) => {
          socket.emit('userData', data);
        });
    }
    if (userObj.type === 'Admin') {
      AdminRepository.model.findOne({ _id: userObj.id })
        .then((data) => {
          socket.emit('userData', data);
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
        const id = data._id;
        socket.emit('newMessage', data);
        socket.broadcast.emit('newMessage', data);
        ConversationRepository.model
          .findOneAndUpdate({ _id: message.conversationId }, { $push: { messages: mongoose.Types.ObjectId(id) } })
          .then();
      });
  });
}

module.exports = connectionHandler;
