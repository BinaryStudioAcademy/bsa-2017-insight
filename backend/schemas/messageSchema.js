const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  conversationId: Schema.Types.ObjectId,
  body: String,
  author: {
    item: { type: Schema.Types.ObjectId, refPath: 'author.userType' },
    userType: String,
  },
  createdAt: Date,
  editedAt: Date,
  isReceived: Boolean,
});

module.exports = mongoose.model('Message', messageSchema);
