var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    globalId: Schema.Types.ObjectId,
    login: String,
    userName: String,
    userSurname: String,
    userEmail: String,
    userPhone: Number,
    userCompany: String,
    userAge: Number,
    userGender: Boolean,
    userCity: String,
    userCountry: String,
    userLanguage: String,
    avatar: String,
    totalNumberOfSessions: Number,
    firstEnterDate: Date,
    lastEnterDate: Date, 
});

module.exports = mongoose.model('User', userSchema); 