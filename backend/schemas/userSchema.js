const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt-nodejs');


const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  dateOfBirth: Date,
  company: String,
  phone: String,
  isIntroduced: Boolean,
  avatar: { type: String, default: 'http://localhost:3000/uploads/avatars/avatar.png' },
  username: { type: String, default: 'Anonymous' },
  gender: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }], // массив, состоящий из айди всех чатов юзера
  activeConversation: { type: Schema.Types.ObjectId, ref: 'Conversation' }, // по идее активный чат должен всегда быть только один
  anonymousCreatedAt: {
    type: Date,
  },
  appId: { type: Schema.Types.ObjectId, required: false }, // CHANGE TO "TRUE" LATER
});

userSchema.methods.checkPassword = function (plainPassword, callback) {
  return bcrypt.compareSync(plainPassword, this.password);
};

userSchema.index({ anonymousCreatedAt: 1 }, { expireAfterSeconds: 3600 * 24 * 7 });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
