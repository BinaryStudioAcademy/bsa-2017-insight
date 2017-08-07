const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
	sessionId: Schema.Types.ObjectId,
	conversationsId: [String],
	name: String,
	status: String,
	email: String,
	location: {
		country: String,
		city: String
	},
	browser: {
		name: String,
		version: String,
		vendor: String
	},
	os: String,
	language: String,
	visitedPages: [{ url: String, duration: Number }],
	device: {
		width: Number,
		height: Number
	},
	timezoneOffset: Number,
	createdAt: Date,
	lastSeen: Date
});

module.exports = sessionSchema;