const connection = require('../db/dbConnect');
const bcrypt = require('bcrypt-nodejs');
const Repository = require('./generalRepository');
const User = require('../schemas/userSchema');

const userRepository = Object.create(Repository.prototype);
userRepository.model = User;

userRepository.getUserByName = function (username, callback) {
  const model = this.model;
  const query = model.findOne({ username });
  query.exec(callback);
};

userRepository.add = function (data, callback) {
  const self = this;
  data.salt = bcrypt.genSaltSync(10);
  bcrypt.hash(data.password, data.salt, null, (err, hash) => {
    data.password = hash;
    Repository.prototype.add.call(self, data, callback);
  });
};

module.exports = userRepository;
