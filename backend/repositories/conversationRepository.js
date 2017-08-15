const Repository = require('./generalRepository');
const Conversation = require('../schemas/conversationSchema');

const conversationRepository = Object.create(Repository.prototype);
conversationRepository.model = Conversation;

conversationRepository.findOneAndPopulate = function (id, callback) {
  this.model.findById({ _id: id }).populate('participants.user messages').exec(callback);
};

conversationRepository.getAllConversations = function(callback){
  conversationRepository.find({}).populate('participants.user').populate({
  path: 'messages',
  populate: {path: 'author.item'}
  })
}


module.exports = conversationRepository;
