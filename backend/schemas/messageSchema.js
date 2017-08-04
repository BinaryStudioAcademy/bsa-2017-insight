var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    globalId: Schema.Types.ObjectId,
    senderId: User,
    receiverId: User,
    createdAt: Date,
    messageText: String
});

module.exports = mongoose.model('Message', messageSchema);