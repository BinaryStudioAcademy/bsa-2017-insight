const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statisticsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  visitorId: { type: Schema.Types.ObjectId, ref: 'Visitor' },
  signedUp: Date,
  firstSeen: Date,
  lastSeen: Date,
  sessionsCount: Number,
  country: String,
  city: String,
  browser: String,
  browserVersion: String,
  browserLanguage: String,
  timeZone: String,
  os: String,
  lastViewedUrl: String,
  online: Boolean,
});

module.exports = mongoose.model('Visitor', statisticsSchema);
