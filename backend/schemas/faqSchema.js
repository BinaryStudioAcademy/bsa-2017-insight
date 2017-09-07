const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const faqSchema = new Schema({
  questionId: Schema.Types.ObjectId,
  question: String,
  answer: String,
  createdAt: Date,
  appId: { type: Schema.Types.ObjectId, required: false }, // CHANGE TO "TRUE" LATER
});

module.exports = mongoose.model('FAQ', faqSchema);
