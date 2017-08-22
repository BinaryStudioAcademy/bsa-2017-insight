const conversationRepository = require('../repositories/conversationRepository');
const userRepository = require('../repositories/userRepository');
const adminRepository = require('../repositories/adminRepository');
const emailService = require('./emailService');

const notificationService = {};

notificationService.emailNotification = (info, cb) => {

  // const receiverId = conversationRepository.findById(info.conversationId);
  // const receiverEmail = userRepository.getEmailById(info.userId)
  // callback(emailService.send({ to: email, subject: 'You have a new message', text: 'New message' }));

  conversationRepository.getReceiverByIds(info.conversationId, info.author.item, info.author.userType, (err, data) => {
    if (err) {
      cb(err);
      return;
    }
    // console.log('DATA');
    // console.log(data);
    const receiverId = data[data.length - 1].participants.user;
    const receiverRepository = info.author.userType === 'Admin' ? userRepository : adminRepository;
    receiverRepository.getById(receiverId, (intErr, intData) => {
      if (intErr) {
        cb(intErr);
        return;
      }
      // console.log('intData');
      // console.log(intData);
      if (intData.email) {
        cb(emailService.send({ to: intData.email, subject: 'You have a new message on InSight', text: info.body }));
      }
    });
  });
};

// notificationService.check = (info, cb) => {
//   cb(emailService.send({ to: 'artem.m.manukyan@gmail.com', subject: 'You have a new message', text: 'New message' }));
// };

module.exports = notificationService;
