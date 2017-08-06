var mongoose = require('mongoose');
var User = require('./userSchema');

var Schema = mongoose.Schema;

var messageSchema = new Schema({
    globalId: Schema.Types.ObjectId,
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    receiverId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: { type: Date, default: Date.now()},
    messageText: String
});

module.exports = mongoose.model('Message', messageSchema);