var mongoose = require('mongoose');
var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var App = require('../schemas/appSchema');

function AppRepository() {
	Repository.prototype.constructor.call(this);
	this.model = App;
}

AppRepository.prototype = new Repository();

// AppRepository.prototype.oneMoreFunction = function(userId, obj, callback) {
// 	var model = this.model;
// 	var query = model.findByIdAndUpdate(userId, {
// 		$push: {
// 			property:{
// 				nestedProperty: value,
// 			}
// 		}
// 	}, {});
// 	query.exec(callback);
// };

AppRepository.prototype.getUser = function(userId, callback) {
	var model = this.model;
	var query = model.aggregate([
		{$project: {
			users: 1,
			_id: 0
		}},
		{$unwind: '$users'},
		{$match: {
			'users._id': mongoose.Types.ObjectId(userId)
		}}
	])
	query.exec(callback);
};

AppRepository.prototype.addUser = function(appId, user, callback) {
	var model = this.model;
	var query = model.update(
		{_id: appId},
		{
		$push: {users: user}
	});
	query.exec(callback);
};

AppRepository.prototype.updateUser = function(userId, user, callback) {
	var model = this.model;
	var query = model.update(
		{'users._id': mongoose.Types.ObjectId(userId)},
		// {$set: {
		// 	// $addToSet: {users: user}
		// 	'users.$'
		// }}
		{$set: {'users.$.age': 33}}
	);
	query.exec(callback);
};

AppRepository.prototype.deleteUser = function(appId, userId, callback) {
	var model = this.model;
	var query = model.update(
		{_id: appId},
		{$pull: {users: {_id: userId}}}
	);
	query.exec(callback);
};

AppRepository.prototype.getAllUsers = function(appId, callback) {
	var model = this.model;
	var query = model.distinct('users', {_id: mongoose.Types.ObjectId(appId)})
	query.exec(callback);
};

module.exports = new AppRepository();
