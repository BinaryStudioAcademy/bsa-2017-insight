const Repository = require('./generalRepository');
const Selection = require('../schemas/selectionSchema');

const SelectionRepository = Object.create(Repository.prototype);
SelectionRepository.model = Selection;

SelectionRepository.getAll = function (appId, callback) {
  const model = this.model;
  const query = model.find({ appId });
  query.exec(callback);
};

SelectionRepository.getByIdAndPopulate = function (id, callback) {
  const model = this.model;
  model.findById(id)
    .populate('users')
    .exec(callback);
};

module.exports = SelectionRepository;
