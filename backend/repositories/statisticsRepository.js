const Statistics = require('../schemas/statisticsSchema');
const Repository = require('./generalRepository');

const statisticsRepository = Object.create(Repository.prototype);
statisticsRepository.model = Statistics;

statisticsRepository.findOneAndPopulate = function (id, callback) {
  this.model.find({ _id: id }).populate('userId').exec(callback);
};

statisticsRepository.updateByUserId = function (id, data) {
  return this.model.update({ userId: id }, data);
};

statisticsRepository.create = function (data) {
  return this.model.create(data);
};

module.exports = statisticsRepository;
