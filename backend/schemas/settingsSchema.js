const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  element: String,
  settings: Object,
  appId: { type: Schema.Types.ObjectId, required: false }, // CHANGE TO "TRUE" LATER
});

module.exports = mongoose.model('Setting', settingsSchema);