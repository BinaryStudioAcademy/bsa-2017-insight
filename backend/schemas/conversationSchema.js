var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conversationSchema = new Schema({
    convId: Schema.Types.ObjectId,
    convName: String, 
    status: String
});

module.exports = mongoose.model('Conversation', conversationSchema); 