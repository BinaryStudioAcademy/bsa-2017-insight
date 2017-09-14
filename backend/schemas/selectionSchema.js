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
  appId: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Selection', selectionSchema);
