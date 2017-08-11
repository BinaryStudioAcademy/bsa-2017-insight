const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new Schema({
  globalId: Schema.Types.ObjectId,
  isSuperUser: Boolean,
  username: { type: String, required: true, unique: true },
  password: String,
  email: String,
  adminSurname: String,
  avatar: String,
  isAdmin: Boolean,
  conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
});

adminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Admin', adminSchema);
