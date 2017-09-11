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
  const socketObj = socket;
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

  socket.on('adminConnectedToRoom', (conversationId) => {
    socketObj.room = conversationId;
    socket.join(conversationId);
  });

  socket.on('getUserConversations', (id) => {
    const objectId = mongoose.Types.ObjectId(id);
    ConversationRepository.getConversationsByUserId(objectId).then((data) => {
      socket.emit('returnUserConversations', data);
    });
  });

  socket.on('newMessage', (message) => {
    const room = socket.room;
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
        socket.broadcast.emit('newMessageToRespond');
        socket.broadcast.to(room).emit('newMessage', messageToSend);
        ConversationRepository.model
          .findOneAndUpdate({ _id: message.conversationId }, { $push: { messages: mongoose.Types.ObjectId(id) } })
          .then();
      });
  });

  socket.on('createNewConversation', (conversationData, creatorId) => {
    createConversationAndUpdateUser(conversationData, creatorId, socket);
  });

  socket.on('createForceConversation', (conversationData, creatorId) => {
    createForceConversation(conversationData, creatorId, socket);
  });

  socket.on('switchRoom', (conversationId) => {
    if (socket.room) socket.leave(socket.room);
    socketObj.room = conversationId;
    socket.join(conversationId);
  });

  socket.on('messagesReceived', (data) => {
    const room = socket.room;

    if (!data.messages.length) {
      return socket.broadcast.to(room).emit('messagesReceived', []);
    }

    if (data.type === 'Admin') {
      const searchObj = {
        conversationId: data.messages[0].conversationId,
        'author.userType': 'User',
      };
      MessageRepository.model.update(searchObj, { isReceived: true }, { multi: true }).exec().then(() => {
        MessageRepository.model.find({ conversationId: data.messages[0].conversationId })
          .populate('author.item')
          .exec()
          .then((updatedMessages) => {
            socket.broadcast.to(room).emit('messagesReceived', updatedMessages);
          });
      });
    }
  });

  socket.on('newMessageReceived', (data) => {
    const room = socket.room;

    if (data.type === 'Admin') {
      MessageRepository.model.findOneAndUpdate({ _id: data.id }, { isReceived: true }, { new: true })
        .populate('author.item')
        .exec()
        .then((updatedMessage) => {
          socket.broadcast.to(room).emit('newMessageReceived', updatedMessage);
        });
    }
  });

  socket.on('introduced', (data) => {
    UserRepository.update(data.id, data.body, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const dataToSendBack = { id: data.id, body: data.body };
        socket.emit('introduced', dataToSendBack);
        socket.broadcast.emit('introduced', dataToSendBack);
      }
    });
  });
}

module.exports = connectionHandler;
