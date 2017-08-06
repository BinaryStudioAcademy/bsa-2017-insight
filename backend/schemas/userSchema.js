var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    globalId: Schema.Types.ObjectId,
    login: { type: String, unique: true, required: true },
    userName: { type: String, required: true }, 
    userSurname: String,
    userEmail: { type: String, unique: true, required: true },
    userPhone: Number,
    userCompany: String,
    userAge: Number,
    userGender: Boolean,
    userCity: String,
    userCountry: String,
    userLanguage: String,
    created: { type: Date, default: Date.now()},
    avatar: String,
    totalNumberOfSessions: Number,
    //firstEnterDate: Date,
    lastEnterDate: Date, 
});

//userSchema.method.hello = function(){}

module.exports = mongoose.model('User', userSchema); 