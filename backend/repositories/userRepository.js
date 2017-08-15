var connection = require('../db/dbConnect');
var Repository = require('./generalRepository');
var User = require('../schemas/userSchema');
var bcrypt = require('bcrypt-nodejs');

function UserRepository() {
  Repository.prototype.constructor.call(this);
  this.model = User;
}

UserRepository.prototype = new Repository();

UserRepository.prototype.getUserByName = function(username, callback) {
  var model = this.model;
  var query = model.findOne({ 'username': username });
  query.exec(callback);
};

UserRepository.prototype.add = function(data, callback) {
  var self = this;
  data.salt = bcrypt.genSaltSync(10);
  bcrypt.hash(data.password, data.salt, null, function(err, hash) {
    data.password = hash;
    Repository.prototype.add.call(self, data, callback);
  });
};

module.exports = new UserRepository();
