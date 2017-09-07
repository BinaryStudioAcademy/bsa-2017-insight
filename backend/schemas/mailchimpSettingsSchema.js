const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mailchimpSettingsSchema = new Schema({
  appId: {
    type: Schema.Types.ObjectId,
    required: true, // CHANGE TO "TRUE" LATER
  },
  apiKey: {
    type: String,
    default: '',
    // required: true,
  },
  company: {
    type: String,
    default: '',
    // required: true,
  },
  address: {
    type: String,
    default: '',
    // required: true,
  },
  city: {
    type: String,
    default: '',
    // required: true,
  },
  state: {
    type: String,
    default: '',
    // required: true,
  },
  zip: {
    type: String,
    default: '',
    // required: true,
  },
  country: {
    type: String,
    default: '',
    // required: true,
  },
  permissionReminder: {
    type: String,
    default: '',
    // required: true,
  },
  fromName: {
    type: String,
    default: '',
    // required: true,
  },
  fromEmail: {
    type: String,
    default: '',
    // required: true,
  },
  subject: {
    type: String,
    default: '',
    // required: true,
  },
  language: {
    type: String,
    default: '',
    // required: true,
  },
});

module.exports = mongoose.model('MailchimpSettings', mailchimpSettingsSchema);
