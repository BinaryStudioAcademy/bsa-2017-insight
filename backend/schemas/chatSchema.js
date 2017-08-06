var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./userSchema');
var Message = require('./messageSchema');

var chatSchema = new Schema({
    globalId: Schema.Types.ObjectId,
    history: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    createdAt: Date,
    lastUpdatedAt: Date
});

module.exports = mongoose.model('Chat', chatSchema);