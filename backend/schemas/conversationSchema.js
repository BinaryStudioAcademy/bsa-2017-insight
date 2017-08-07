const mongoose = require('mongoose');
const messageSchema = require('./messageSchema');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
	clientSessionId: Schema.Types.ObjectId,
	createdAt: Date,
	lastUpadated: Date,
	messages: [messageSchema]
});

module.exports = conversationSchema;