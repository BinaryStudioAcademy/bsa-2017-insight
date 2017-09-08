const ForceMessage = require('../schemas/forceMessageSchema');
const Repository = require('./generalRepository');

const ForceMessageRepository = Object.create(Repository.prototype);
ForceMessageRepository.model = ForceMessage;

ForceMessageRepository.getAllByAppId = function (id, callback) {
  const model = this.model;
  model.find({ appId: id }).exec(callback);
};

module.exports = ForceMessageRepository;
