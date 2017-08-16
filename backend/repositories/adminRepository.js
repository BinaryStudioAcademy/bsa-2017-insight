const connection = require('./../db/dbConnect');
const Repository = require('./generalRepository');
const Admin = require('../schemas/adminSchema');
const bcrypt = require('bcrypt-nodejs');

const AdminRepository = Object.create(Repository.prototype);
AdminRepository.model = Admin;

AdminRepository.add = function (data, callback) {
  data.salt = bcrypt.genSaltSync(10);
  bcrypt.hash(data.password, data.salt, null, (err, hash) => {
    if(err) return callback(err);
    data.password = hash;
    const newAdmin = new Admin(data);
    newAdmin.save(callback);
  });
};

module.exports = AdminRepository;

