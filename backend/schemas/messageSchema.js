var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    chatId: {
        type: Schema.ObjectId,
        required: true
    },
    senderId: {
        type: Schema.ObjectId,
        required: true
    },
    senderType: String,
    time: Date,
    read: Boolean,
    text: String
});

module.exports = mongoose.model('Message', messageSchema);