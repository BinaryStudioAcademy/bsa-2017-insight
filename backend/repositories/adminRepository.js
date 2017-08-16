const connection = require('./../db/dbConnect');
const Repository = require('./generalRepository');
const Admin = require('../schemas/adminSchema');
const bcrypt = require('bcrypt-nodejs');

const AdminRepository = Object.create(Repository.prototype);
AdminRepository.model = Admin;

AdminRepository.getAdminByName = function (username, callback) {
  const model = this.model;
  const query = model.findOne({ username });
  query.exec(callback);
};

AdminRepository.add = function (data, callback) {
  const self = this;
  data.salt = bcrypt.genSaltSync(10);
  bcrypt.hash(data.password, data.salt, null, (err, hash) => {
    data.password = hash;
    Repository.prototype.add.call(self, data, callback);
  });
};

module.exports = AdminRepository;

