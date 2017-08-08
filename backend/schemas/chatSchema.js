var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    supportId: {
        type: Schema.ObjectId,
        required: true
    },
    appId: {
        type: Schema.ObjectId,
        required: true
    },
    status: String
});

module.exports = mongoose.model('Chat', chatSchema);