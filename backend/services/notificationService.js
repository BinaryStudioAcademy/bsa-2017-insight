const async = require('async');
const conversationRepository = require('../repositories/conversationRepository');
const userRepository = require('../repositories/userRepository');
const adminRepository = require('../repositories/adminRepository');
const emailService = require('./emailService');

const notificationService = {};

notificationService.messageToUser = (info, callback) => {

  async.waterfall([
    function() {
      return conversationRepository.getById(info.conversationId);
    },
    function(conversation) {
      // return conversation.participants.
      console.log(conversation.participants);
    }
  ]);
  // const receiverId = conversationRepository.findById(info.conversationId);
  // const receiverEmail = userRepository.getEmailById(info.userId)
  // callback(emailService.send({ to: email, subject: 'You have a new message', text: 'New message' }));
  callback(null);

};

module.exports = notificationService;
