var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Admin = require('../schemas/adminSchema');

function AdminRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Admin;
}

AdminRepository.prototype = new Repository();

AdminRepository.prototype.oneMoreFunction = function(adminId, obj, callback) {
    var model = this.model;
    var query = model.findByIdAndUpdate(adminId, {
        $push: {
            property:{
                nestedProperty: value,
            }
        }
    }, {});
    query.exec(callback);
};

module.exports = new AdminRepository();

