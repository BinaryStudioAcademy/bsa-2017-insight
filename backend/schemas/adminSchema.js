const mongoose = require('mongoose');
const Conversation = require('./conversationSchema');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

let adminSchema = new Schema({
    globalId: Schema.Types.ObjectId,
    isSuperUser: Boolean,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: String,
    adminName: String,
    adminSurname: String,
    avatar: String, 
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }]
});

adminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Admin" , adminSchema); 