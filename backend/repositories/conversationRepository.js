const Repository = require('./generalRepository');
const Conversation = require('../schemas/conversationSchema');

const conversationRepository = Object.create(Repository.prototype);
conversationRepository.model = Conversation;

conversationRepository.findOneAndPopulate = function (id, callback) {
  this.model.findById({ _id: id }).populate('participants.user messages').exec(callback);
};

conversationRepository.getConversationsByUserId = function (id) {
  const model = this.model;
  return model.find({ 'participants.user': id }).populate({ // query под вопросом
    path: 'messages',
    populate: { path: 'author.item' },
  }).exec();
};

module.exports = conversationRepository;
