const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forceMessageSchema = new Schema({
  appId: { type: Schema.Types.ObjectId, required: false }, // CHANGE TO "TRUE" LATER
  page: String,
  body: String,
  conditions: {
    timer: Number,
    visitedURLS: [String],
  },
});

module.exports = mongoose.model('ForceMessage', forceMessageSchema);
