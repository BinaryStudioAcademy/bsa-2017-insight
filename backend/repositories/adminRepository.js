const connection = require('./../db/dbConnect');
const Repository = require('./generalRepository');
const Admin = require('../schemas/adminSchema');
const bcrypt = require('bcrypt-nodejs');

const AdminRepository = Object.create(Repository.prototype);
AdminRepository.model = Admin;

// AdminRepository.getAll = function (callback) {
//   const model = this.model;
//   const query = model.find();
//   query.exec(callback);
// };

AdminRepository.add = function (data, callback) {
  data.salt = bcrypt.genSaltSync(10);
  bcrypt.hash(data.password, data.salt, null, (err, hash) => {
    if (err) return callback(err);
    data.password = hash;
    const newAdmin = new Admin(data);
    newAdmin.save(callback);
  });
};

AdminRepository.findOneAndPopulate = function (id, callback) {
  const model = this.model;
  model.findById({ _id: id }).populate('conversations').exec(callback);
};

AdminRepository.getAllAdmins = function (appId, callback) {
  this.model.find({ appId }).exec(callback);
};

module.exports = AdminRepository;

