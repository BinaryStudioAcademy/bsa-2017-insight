var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Conversation = require('../schemas/conversationSchema');

function ConversationRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Conversation;
}

ConversationRepository.prototype = new Repository();

module.exports = new ConversationRepository();
