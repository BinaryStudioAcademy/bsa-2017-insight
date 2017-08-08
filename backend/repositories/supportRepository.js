var mongoose = require('mongoose');
var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Support = require('../schemas/supportSchema');

function SupportRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Support;
}

SupportRepository.prototype = new Repository();

SupportRepository.prototype.add = function(data, callback){
	var model = this.model;
	data.time = new Date();
	var newitem = new model(data);
	newitem.save(callback);
};

SupportRepository.prototype.getSupportsOfApp = function(appId, callback) {
	var model = this.model;
	var query = model.find({apps: {$elemMatch: {$eq: appId}}});
	query.exec(callback);
};

SupportRepository.prototype.addAppToSupport = function(appId, callback) {
	var model = this.model;
	var query = model.update({$push: {apps: appId}});
	query.exec(callback);
};

SupportRepository.prototype.deleteAppFromSupport = function(appId, callback) {
	var model = this.model;
	var query = model.update({$pull: {apps: appId}});
	query.exec(callback);
};

module.exports = new SupportRepository();
