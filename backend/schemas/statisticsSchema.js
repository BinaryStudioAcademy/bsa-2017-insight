const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statisticsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  appId: { type: Schema.Types.ObjectId, required: false }, // CHANGE TO "TRUE" LATER
  firstVisitDate: Number,
  currentUrl: String,
  viewedUrls: [String],
  browserLanguage: String,
  geoLocation: String,
  online: Boolean,
  coordinates: String,
  userIpAddress: String,
  country: String,
  city: String,
  screenWidth: Number,
  screenHeight: Number,
  userAgent: String,
  timeZone: String,
  signedUp: Date,
  sessionsCount: Number,
  browser: String,
  browserVersion: String,
  os: String,
  deviceType: String,
});

module.exports = mongoose.model('Statistics', statisticsSchema);
