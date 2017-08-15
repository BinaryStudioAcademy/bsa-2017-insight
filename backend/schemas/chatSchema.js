const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  _chatId: {
    type: Schema.Types.ObjectId,
  },

  status: {
    type: String,
    enum: ['open', 'closed'],
  },

  messages: [{
    _userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    _supportId: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    text: String,
    createdAt: Date,
  }],
});

module.exports = mongoose.model('Chat', chatSchema);
