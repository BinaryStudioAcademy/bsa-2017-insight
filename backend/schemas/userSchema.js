const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  globalId: Schema.Types.ObjectId,
  userName: String,
  login: String,
  password: String,
  name: String,
  surName: String,
  type: String, // admin, operator
  email: String,
  billingPlan: String, // нужно ли
  createdAt: Date,
  avatar: String,
  // дополнительная инфа, которую мы должны знать о юзере
  conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }], // массив, состоящий из айди всех чатов юзера
});

module.exports = mongoose.model('User', userSchema);
