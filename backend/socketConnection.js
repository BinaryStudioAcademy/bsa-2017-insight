const MessageRepository = require('./repositories/messageRepository');
const ConversationRepository = require('./repositories/conversationRepository');
const UserRepository = require('./repositories/userRepository');
const AdminRepository = require('./repositories/adminRepository');
const createConversationAndUpdateUser = require('./services/conversationService').createConversationAndUpdateUser;
const createForceConversation = require('./services/conversationService').createForceConversation;
const checkIfAdminIsConversationParticipant = require('./services/conversationService').checkIfAdminIsConversationParticipant;
const reassignConversation = require('./services/conversationService').reassignConversation;

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
      .then((createdMessage) => {
        createdMessage.populate('author.item', (err, data) => {
          const messageToSend = data;
          if(message.author.userType === 'User') {
            AdminRepository.model.update({ conversations: message.conversationId }, { $push: { unreadMessages: mongoose.Types.ObjectId(message.conversationId) } }, (err, result) => {
              socket.broadcast.emit('newMessageToRespond', data);
            });
          } else {
            socket.broadcast.emit('newMessageToRespond', data);
          }        
          const id = data._id;
          socket.emit('newMessage', messageToSend);
          socket.broadcast.to(room).emit('newMessage', messageToSend);
          ConversationRepository.model
            .findOneAndUpdate({ _id: message.conversationId }, { $push: { messages: mongoose.Types.ObjectId(id) }, $set: { updatedAt: new Date() } }, { new: true })
            .populate('participants.user')
            .populate({
            path: 'messages',
            populate: { path: 'author.item' },
          }).exec((err, conversation) => {
            if(conversation.messages.length === 1) {
              socket.broadcast.emit('newConversationCreated', conversation);
            }
          });
        });
      })
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
            AdminRepository.model.update({ conversations: data.messages[0].conversationId }, { $pullAll: { unreadMessages: [data.messages[0].conversationId] } })
              .exec()
              .then((result) => {
                socket.broadcast.to(room).emit('messagesReceived', updatedMessages);
              }, (err) => {
                console.log(err);
              });
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

  socket.on('reassign conversation', (data) => {
    reassignConversation(data.conversationId, data.currentUserId, data.newUser, (err, result) => {
      if(err) return socket.emit('reassign response', { ok: false, message: err.message });
      socket.emit('reassign response', result);
      socket.broadcast.emit('reassigned conversation', {
        conversationId: data.conversationId,
        to: data.newUser.user,
        userId: result.userId,
        reassignedConversation: result.reassignedConversation,
      });
    });
  });

  socket.on('reassignedConversationSeen', (data) => {
    ConversationRepository.model.update({ _id: data.conversationId }, { $set: { isReassigned: false } }, (err, result) => {
      if(err) return;
      AdminRepository.model.update({ _id: data.adminId }, { $pull: { reassignedConversations: data.conversationId } }, (err, result) => {
        if(err) return;
        socket.emit('reassignedConversationSeenOk', data.conversationId);
      });
    });
  });

  socket.on('conversationPicked', (admin) => {
    socket.broadcast.emit('conversationPicked', admin);
  });

  socket.on('newConversationPicked', (conversationId) => {
    socket.broadcast.emit('newConversationPicked', conversationId);
  });
}

module.exports = connectionHandler;
