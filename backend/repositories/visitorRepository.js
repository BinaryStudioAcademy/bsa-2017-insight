const Repository = require('./generalRepository');
const User = require('../schemas/visitorSchema');

const visitorRepository = Object.create(Repository.prototype);
visitorRepository.model = User;

visitorRepository.findOneAndPopulate = function (id, callback) {
  this.model.findById({ _id: id }).populate('conversations activeConversation widget').exec(callback);
};

module.exports = visitorRepository;
