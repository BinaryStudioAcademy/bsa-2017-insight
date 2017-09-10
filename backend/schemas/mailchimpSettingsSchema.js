const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mailchimpSettingsSchema = new Schema({
  appId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  apiKey: {
    type: String,
    default: '',
  },
  contact: {
    company: {
      type: String,
      default: 'undefined',
    },
    address: {
      type: String,
      default: 'Far Far Away',
    },
    city: {
      type: String,
      default: 'Far Far Away',
    },
    state: {
      type: String,
      default: 'Far Far Away',
    },
    zip: {
      type: String,
      default: '1337',
    },
    country: {
      type: String,
      default: 'Far Far Away',
    },
  },
  permission_reminder: {
    type: String,
    default: 'You were subscribed to InSight mailings',
  },
  campaign_defaults: {
    fromName: {
      type: String,
      default: 'undefined',
    },
    fromEmail: {
      type: String,
      default: 'mail@server.net',
    },
    subject: {
      type: String,
      default: 'Message from us',
    },
    language: {
      type: String,
      default: 'English',
    },
  },
  email_type_option: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('MailchimpSettings', mailchimpSettingsSchema);
