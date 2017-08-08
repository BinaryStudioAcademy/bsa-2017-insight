var mongoose = require('mongoose');
var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Message = require('../schemas/messageSchema');

function MessageRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Message;
}

MessageRepository.prototype = new Repository();

MessageRepository.prototype.add = function(data, callback){
	var model = this.model;
	data.time = new Date();
	var newitem = new model(data);
	newitem.save(callback);
};

MessageRepository.prototype.getMessagesFromChat = function(chatId, callback){
	var model = this.model;
	var query = model.find({'chatId': chatId});
	query.exec(callback);
};

module.exports = new MessageRepository();
