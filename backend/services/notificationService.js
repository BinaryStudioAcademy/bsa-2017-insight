const conversationRepository = require('../repositories/conversationRepository');
const userRepository = require('../repositories/userRepository');
const adminRepository = require('../repositories/adminRepository');
const emailService = require('./emailService');

const notificationService = {};

notificationService.emailNotification = (info, cb) => {
  conversationRepository.getReceiverByIds(info.conversationId, info.author.item, info.author.userType, (err, data) => {
    if (err) {
      cb(err);
      return;
    }
    const receiverId = data[data.length - 1].participants.user;
    const receiverRepository = info.author.userType === 'Admin' ? userRepository : adminRepository;
    receiverRepository.getById(receiverId, (intErr, intData) => {
      if (intErr) {
        cb(intErr);
        return;
      }
      if (intData.email) {
        cb(emailService.send({
          to: intData.email,
          subject: `You have a new message on InSight from ${intData.username || 'an anonimous user'}`,
          text: ' ',
          html: `<p><q>${info.body}</q></p>
<p>You can visit <a href="http://localhost:3000/${info.author.userType === 'Admin' ? '' : 'admin/respond/'}">InSight</a> to answer.</p>`
        }));
      }
    });
  });
};

// notificationService.check = (info, cb) => {
//   cb(emailService.send({ to: 'artem.m.manukyan@gmail.com', subject: 'You have a new message', text: 'New message' }));
// };

module.exports = notificationService;
