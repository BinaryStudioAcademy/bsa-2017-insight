const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const selectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  mailings: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: 'Mailing',
  },
});

module.exports = mongoose.model('Selection', selectionSchema);
