const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
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
  firstName: String,
  lastName: String,
  avatar: String,
  gender: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
});

adminSchema.methods.checkPassword = function(plainPassword, callback) {
  return bcrypt.compareSync(plainPassword, this.password);
};

adminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Admin', adminSchema);
