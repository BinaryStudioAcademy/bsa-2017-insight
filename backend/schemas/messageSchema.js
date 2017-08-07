var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    messageId: Schema.Types.ObjectId,
    convId: Schema.Types.ObjectId,
    text: String, 
    date: Date,
    wasRead: Boolean
});

module.exports = mongoose.model('Message', messageSchema); 