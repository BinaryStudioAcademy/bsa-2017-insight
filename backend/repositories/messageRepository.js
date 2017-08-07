var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Message = require('../schemas/messageSchema');

function MessageRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Message;
}

MessageRepository.prototype = new Repository();

module.exports = new MessageRepository();
