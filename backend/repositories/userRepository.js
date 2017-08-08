var connection = require('../db/dbConnect');
var Repository = require('./generalRepository');
var User = require('../schemas/userSchema');

function UserRepository() {
	Repository.prototype.constructor.call(this);
	this.model = User;
}

UserRepository.prototype = new Repository();

UserRepository.prototype.oneMoreFunction = function(userId, obj, callback) {
	var model = this.model;
	var query = model.findByIdAndUpdate(userId, {
		$push: {
			property:{
				nestedProperty: value,
			}
		}
	}, {});
	query.exec(callback);
};

module.exports = new UserRepository();
