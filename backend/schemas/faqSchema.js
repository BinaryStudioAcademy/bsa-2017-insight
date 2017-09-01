const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const faqSchema = new Schema({
  questionId: Schema.Types.ObjectId,
  question: String,
  answer: String,
  createdAt: Date,
});

module.exports = mongoose.model('FAQ', faqSchema);
