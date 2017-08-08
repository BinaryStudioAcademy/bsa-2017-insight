var mongoose = require('mongoose');
var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var User = require('../schemas/userSchema');

function UserRepository() {
	Repository.prototype.constructor.call(this);
	this.model = User;
}

UserRepository.prototype = new Repository();

UserRepository.prototype.add = function(data, callback){
	var model = this.model;
	data.registered = new Date();
	var newitem = new model(data);
	newitem.save(callback);
};

UserRepository.prototype.getUsersOfApp = function(appId, callback) {
	var model = this.model;
	var query = model.find({appId: mongoose.Types.ObjectId(appId)});
	query.exec(callback);
};

module.exports = new UserRepository();
