const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const visitorSchema = new Schema({
  globalId: Schema.Types.ObjectId,
  name: String,
  email: String,
  conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }], // массив, состоящий из айди всех чатов юзера
  activeConversation: { type: Schema.Types.ObjectId, ref: 'Conversation' }, // по идее активный чат должен всегда быть только один
});

module.exports = mongoose.model('Visitor', visitorSchema);
