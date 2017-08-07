var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conversationSchema = new Schema({
    globalId: Schema.Types.ObjectId,
    //some important info
});

module.exports = mongoose.model('Conversation', conversationSchema);