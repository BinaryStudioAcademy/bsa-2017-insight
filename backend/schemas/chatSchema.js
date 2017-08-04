var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
    globalId: Schema.Types.ObjectId,
    history: [Message],
    users: [User],
    createdAt: Date,
    lastUpdatedAt: Date
});

module.exports = mongoose.model('Chat', chatSchema);