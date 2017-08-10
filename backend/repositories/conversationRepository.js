const Repository = require('./generalRepository');
const Conversation = require('../schemas/conversationSchema');

const conversationRepository = Object.create(Repository.prototype);
conversationRepository.model = Conversation;

conversationRepository.findOneAndPopulate = function (id, callback) {
  this.model.findById({ _id: id }).populate('participants.user messages').exec(callback);
};

module.exports = conversationRepository;
