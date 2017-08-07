var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userId: Schema.Types.ObjectId,
    login: String,
    userName: String,
    userSurname: String,
    avatar: String,
    email: String,
    telephone: String,
    age: Number,
    lastEnterDate: Date,
    localTime: Date,
    status: String,
    support: Boolean
});

module.exports = mongoose.model('User', userSchema); 