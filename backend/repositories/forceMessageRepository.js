const ForceMessage = require('../schemas/forceMessageSchema');
const Repository = require('./generalRepository');

const ForceMessageRepository = Object.create(Repository.prototype);
ForceMessageRepository.model = ForceMessage;

ForceMessageRepository.getAllByAppId = function (id, callback) {
  const model = this.model;
  model.find({ appId: id }).exec(callback);
};

ForceMessageRepository.checkIfPathExists = function (page) {
  const model = this.model;
  return model.findOne({ page }).exec();
};

ForceMessageRepository.updateForceMessage = function (id, updateData) {
  const model = this.model;
  const updateObj = {
    body: updateData.body,
    timer: updateData.timer,
  };
  return model.update({ _id: id }, { $set: updateObj }).exec();
};

module.exports = ForceMessageRepository;
