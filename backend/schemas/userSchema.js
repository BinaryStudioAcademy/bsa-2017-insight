const mongoose = require('mongoose');
const conversationSchema = require('./conversationSchema');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    globalId: Schema.Types.ObjectId,
    name: {
    	first: String,
    	last: String
    },
    age: Number,
    sex: String,
	location: {
    	country: String,
    	city: String
    },
    timezoneOffset: Number,
    contacts: {
    	email: String,
    	phone: String
    },
    avatar: String,
    company: String,
    language: String,
    signUpDate: Date,
    lastSeenDate: Date,
    accountType: String,
    conversations: [conversationSchema],
    status: String
});

module.exports = mongoose.model('User', userSchema);