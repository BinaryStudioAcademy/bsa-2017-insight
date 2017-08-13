const Widget = require('../schemas/widgetSchema');
const Repository = require('./generalRepository');

const widgetRepository = Object.create(Repository.prototype);
widgetRepository.model = Widget;

widgetRepository.findOneAndPopulate = function (id, callback) {
  this.model.findById({ _id: id }).populate('user').exec(callback);
};

module.exports = widgetRepository;