var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MessagesSchema = require("./messageSchema").schema

var chatSchema = new Schema({
    createdAt: Date,
    users:[{type:Schema.Types.ObjectId,ref:"User"}],
    messages:[{type:Schema.Types.ObjectId,ref:"Message"}],
    isOpen : Boolean
});

module.exports ={
 schema : chatSchema,
 model: mongoose.model('Chat', chatSchema)
}