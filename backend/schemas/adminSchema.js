const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new Schema({
  globalId: Schema.Types.ObjectId,
  appId: { type: Schema.Types.ObjectId },
  isSuperUser: { type: Boolean, default: false },
  moderator: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: String,
  email: String,
  isAdmin: Boolean,
  isServiceAdmin: Boolean,
  firstName: String,
  lastName: String,
  avatar: String,
  gender: String,
  verified: { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
  adminGroups: [String],
  reassignedConversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
  unreadMessages: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
});

adminSchema.methods.checkPassword = function (plainPassword, callback) {
  return bcrypt.compareSync(plainPassword, this.password);
};

adminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Admin', adminSchema);
