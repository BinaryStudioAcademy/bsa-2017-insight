const MessageRepository = require('./repositories/messageRepository');
const ConversationRepository = require('./repositories/conversationRepository');
const VisitorsRepository = require('./repositories/visitorRepository');
const mongoose = require('mongoose');

function connectionHandler(socket) {
  console.log('user connected');
  socket.emit('user connected');
  socket.on('userId', (id) => {
    VisitorsRepository.model.findOne({ _id: id }).then((data) => {
      socket.emit('userData', data);
    });
  });
  socket.on('getConversation', (id) => {
    ConversationRepository.model.findOne({ _id: id })
      .populate('participants.user messages')
      .exec()
      .then((conversation) => {
        socket.emit('returnConversation', conversation);
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
