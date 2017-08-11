const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    globalId: Schema.Types.ObjectId,
    login: String,
    userName: String,
    userSurname: String,
    avatar: String
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
