const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  globalId: Schema.Types.ObjectId,
  login: String,
  username: { type: String, required: true, unique: true },
  userSurname: String,
  avatar: String,
  chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
