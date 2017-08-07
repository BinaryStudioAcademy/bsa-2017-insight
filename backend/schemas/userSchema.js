var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ChatSchema = require("./chatSchema").schema


var userSchema = new Schema({
    globalId: Schema.Types.ObjectId,
    login: String,
    userName: String,
    userSurname: String,
    email: String,
    avatar: String,
    createdAt: Date,
    online: Boolean,
    telNumber: String,
    counrty: String,
    userStatInfo:{type: Schema.Types.ObjectId,ref:"userstat"},
    chats:[ChatSchema],
    userType:{
        admin: Boolean,
        loginnedUser: Boolean,
    }

});

module.exports = mongoose.model('User', userSchema); 