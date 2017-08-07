const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
	messageId: Schema.Types.ObjectId,
	text: String,
	createdAt: Date,
	seen: Boolean,
});

module.exports = messageSchema;