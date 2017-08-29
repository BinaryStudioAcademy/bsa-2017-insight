const Settings = require('../schemas/settingsSchema');
const Repository = require('./generalRepository');

const settingsRepository = Object.create(Repository.prototype);
settingsRepository.model = Settings;

settingsRepository.setSettings = function(element, settings, callback) {
  const newSettings = {};
  Object.keys(settings).forEach((option) => {
    newSettings[`settings.${option}`] = settings[option];
  });
  console.log(element, newSettings);
  this.model.findOneAndUpdate({ element: element }, newSettings, {upsert:true}, callback);
}

settingsRepository.getSettings = function(element, callback) {
	this.model.findOne({ element }, "settings -_id", callback);
}

module.exports = settingsRepository;