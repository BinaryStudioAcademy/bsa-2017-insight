var mongoose = require('mongoose');
var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Chat = require('../schemas/chatSchema');

function ChatRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Chat;
}

ChatRepository.prototype = new Repository();

module.exports = new ChatRepository();
