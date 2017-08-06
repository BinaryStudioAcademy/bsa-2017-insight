const Repository = require('./generalRepository');
const User = require('../schemas/userSchema');

const userRepository = Object.create(Repository.prototype);
userRepository.model = User;

userRepository.findOneAndPopulate = function (id, callback) {
  this.model.findById({ _id: id }).populate('conversations').exec(callback);
};

module.exports = userRepository;