const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const visitorSchema = new Schema({
  _id: Schema.Types.ObjectId,
  globalId: String,
  name: String,
  email: String,
  avatar: String,
  conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }], // массив, состоящий из айди всех чатов юзера
  activeConversation: { type: Schema.Types.ObjectId, ref: 'Conversation' }, // по идее активный чат должен всегда быть только один
});

module.exports = mongoose.model('Visitor', visitorSchema);
