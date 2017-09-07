const Repository = require('./generalRepository');
const MailchimpSettings = require('../schemas/mailchimpSettingsSchema');

const MailchimpSettingsRepository = Object.create(Repository.prototype);
MailchimpSettingsRepository.model = MailchimpSettings;

MailchimpSettingsRepository.findByAppId = function (appId, callback) {
  const model = this.model;
  const query = model.find({ appId });
  query.exec(callback);
};

// MailchimpSettingsRepository.add = function (appId, callback) {
//   const model = this.model;
//   const query = model.insert({ appId });
//   query.exec(callback);
// };

MailchimpSettingsRepository.update = function (appId, update, callback) {
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
