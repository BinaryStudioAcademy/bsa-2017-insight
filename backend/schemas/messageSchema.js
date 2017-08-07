var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    sender: {type:Schema.Types.ObjectId,ref:"User"},
    reciever: {type:Schema.Types.ObjectId,ref:"User"},
    chatId: {type:Schema.Types.ObjectId,ref:"Chat"},
    createdAt: String,
    edited: Boolean,
    body: String
});

module.exports ={
 schema : messageSchema,
 model: mongoose.model('Message', messageSchema)
}

