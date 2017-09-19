const Repository = require('./generalRepository');
const MailchimpSettings = require('../schemas/mailchimpSettingsSchema');

const MailchimpSettingsRepository = Object.create(Repository.prototype);
MailchimpSettingsRepository.model = MailchimpSettings;

MailchimpSettingsRepository.findByAppId = function (appId, callback) {
  const model = this.model;
  const query = model.find({ appId });
  query.exec(callback);
};

MailchimpSettingsRepository.update = function (appId, fields, callback) {
  const update = {};
  for (const field in fields) {
    if (field.match(/from_email|from_name|language|subject/)) {
      update['campaign_defaults.' + field] = fields[field];
    }
    else if (field.match(/country|zip|state|city|address|company/)) {
      update['contact.' + field] = fields[field];
    }
    else {
      update[field] = fields[field];
    }
  }
  const model = this.model;
  const query = model.update({ appId }, update);
  query.exec(callback);
};

// MailchimpSettingsRepository.getByIdAndPopulate = function (id, callback) {
//   const model = this.model;
//   model.findById(id)
//     .populate('users')
//     .exec(callback);
// };

module.exports = MailchimpSettingsRepository;
