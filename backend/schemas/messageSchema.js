const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  // тут еще не совсем понятно, должны ли мы будем указывать айди, или он присовится автоматом мунгусом, под вопросом?
  //  _id: Schema.Types.ObjectId,
  conversationId: Schema.Types.ObjectId,
  body: String,
  author: {
    item: { type: Schema.Types.ObjectId, refPath: 'author.userType' },
    userType: String,
  },
  createdAt: Date,
  editedAt: Date,
});

module.exports = mongoose.model('Message', messageSchema);
