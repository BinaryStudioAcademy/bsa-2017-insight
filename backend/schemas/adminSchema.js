const mongoose = require('mongoose');
const Conversation = require('./conversationSchema');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new Schema({
  globalId: Schema.Types.ObjectId,
  isSuperUser: Boolean,
  adminName: { type: String, required: true, unique: true },
  password: String,
  email: String,
  adminSurname: String,
  avatar: String,
  conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
});

adminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Admin', adminSchema);
