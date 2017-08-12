const MessageRepository = require('./repositories/messageRepository');
const ConversationRepository = require('./repositories/conversationRepository');
const UserRepository = require('./repositories/userRepository');
const mongoose = require('mongoose');

function connectionHandler(socket) {
  console.log('user connected');
  socket.emit('user connected');
  socket.on('userId', (id) => {
    UserRepository.model.findOne({ _id: id })
      .populate({
        path: 'conversations',
        populate: { path: 'messages' },
      })
      .exec()
      .then((data) => {
        socket.emit('userData', data);
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
          .then((response) => {
            console.log(response);
          });
      });
  });
}

module.exports = connectionHandler;
