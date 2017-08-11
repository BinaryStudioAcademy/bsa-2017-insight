var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Admin = require('../schemas/adminSchema');
var bcrypt = require('bcrypt-nodejs');

function AdminRepository() {
  Repository.prototype.constructor.call(this);
  this.model = Admin;
}

AdminRepository.prototype = new Repository();

AdminRepository.prototype.getAdminByName = function(adminName, callback) {
  var model = this.model;
  var query = model.findOne({ 'adminName':  adminName });
  query.exec(callback);
};

AdminRepository.prototype.add = function(data, callback) {
  var self = this;
  data.salt = bcrypt.genSaltSync(10);
  bcrypt.hash(data.password, data.salt, null, function(err, hash) {
    data.password = hash;
    Repository.prototype.add.call(self, data, callback);
  });
};

module.exports = new AdminRepository();

