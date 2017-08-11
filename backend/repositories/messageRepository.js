const Repository = require('./generalRepository');
const Message = require('../schemas/messageSchema');

const messageRepository = Object.create(Repository.prototype);
messageRepository.model = Message;

messageRepository.findOneAndPopulate = function (id, callback) {
  const model = this.model;
  model.findById(id).populate('author.item').exec(callback);
};

module.exports = messageRepository;
